param(
    [string]$BaseUrl = "https://journals.panorama-sg.com/index.php",
    [string]$Output = "data/articles.json",
    [int]$Limit = 20,
    [int]$PoolLimit = 50,
    [int]$MaxIssuesPerJournal = 8,
    [int]$MaxArticlesToCrawl = 220,
    [int]$RequestDelaySeconds = 2,
    [string[]]$JournalSlugs = @(
        "AFS",
        "CSGS",
        "files",
        "HealthNexus",
        "JESA",
        "JLPCS",
        "JSCC",
        "PEMR",
        "Resonance",
        "RGGD",
        "Silence",
        "tts"
    ),
    [switch]$IncludeFuture
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$script:OutputPath = if ([System.IO.Path]::IsPathRooted($Output)) { $Output } else { Join-Path (Get-Location) $Output }

function Use-ExistingArticleCache {
    param($Reason)
    if (Test-Path -LiteralPath $script:OutputPath) {
        Write-Warning "Unable to refresh article records: $Reason"
        Write-Warning "Keeping existing article cache at $script:OutputPath and exiting successfully."
        exit 0
    }
}

trap {
    Use-ExistingArticleCache $_
    throw $_
}

function Normalize-Text {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
    return (($Value -replace [char]0x00A0, " ") -replace "\s+", " ").Trim()
}

function Get-NodeText {
    param($Node, [string]$Path, $NamespaceManager)
    $found = $Node.SelectSingleNode($Path, $NamespaceManager)
    if ($null -eq $found) { return "" }
    return Normalize-Text $found.InnerText
}

function Get-NodeTexts {
    param($Node, [string]$Path, $NamespaceManager)
    @($Node.SelectNodes($Path, $NamespaceManager) | ForEach-Object { Normalize-Text $_.InnerText } | Where-Object { $_ })
}

function Get-JournalSlug {
    param([string]$Url, [string]$Journal)

    $setSlugMap = @{
        "afs" = "AFS"; "csgs" = "CSGS"; "files" = "files"; "healthnexus" = "HealthNexus"
        "jesa" = "JESA"; "jlpcs" = "JLPCS"; "jscc" = "JSCC"; "pemr" = "PEMR"
        "resonance" = "Resonance"; "rggd" = "RGGD"; "silence" = "Silence"; "tts" = "tts"
    }

    if ($Url -match "/index\.php/([^/]+)/") {
        $slugKey = $Matches[1].ToLowerInvariant()
        if ($setSlugMap.ContainsKey($slugKey)) { return $setSlugMap[$slugKey] }
    }

    $journalSlugMap = @{
        "ai & future society" = "AFS"
        "climate sustainability & global systems" = "CSGS"
        "global review of humanities, arts, and society" = "files"
        "health nexus" = "HealthNexus"
        "journal of engineering systems and applications" = "JESA"
        "journal of law, psychology, and communication studies" = "JLPCS"
        "journal of social cognition and communication" = "JSCC"
        "poliecom administration review" = "PEMR"
        "resonance: journal of global music studies" = "Resonance"
        "silence" = "Silence"
        "three teachings studies: confucianism, daoism, and buddhism" = "tts"
        "乡村善治与绿色发展" = "RGGD"
    }

    $key = (Normalize-Text $Journal).ToLowerInvariant()
    if ($journalSlugMap.ContainsKey($key)) { return $journalSlugMap[$key] }
    return ""
}

function Decode-Html {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
    return [System.Net.WebUtility]::HtmlDecode($Value)
}

function Strip-Html {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
    $withoutScripts = $Value -replace "(?is)<script\b.*?</script>", " " -replace "(?is)<style\b.*?</style>", " "
    $withBreaks = $withoutScripts -replace "(?i)<\s*(br|p|div|li|h[1-6]|tr|section|article)\b[^>]*>", "`n"
    return Normalize-Text (Decode-Html ($withBreaks -replace "(?s)<[^>]+>", " "))
}

function Get-RegexGroup {
    param([string]$Text, [string]$Pattern, [int]$Group = 1)
    $match = [regex]::Match($Text, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $match.Success) { return "" }
    return Normalize-Text (Decode-Html $match.Groups[$Group].Value)
}

function Get-MetaContents {
    param([string]$Html, [string]$Name)
    $escapedName = [regex]::Escape($Name)
    $patterns = @(
        "<meta\b(?=[^>]*(?:name|property)=['""]$escapedName['""])(?=[^>]*content=['""]([^'""]*)['""])[^>]*>",
        "<meta\b(?=[^>]*content=['""]([^'""]*)['""])(?=[^>]*(?:name|property)=['""]$escapedName['""])[^>]*>"
    )
    $values = New-Object System.Collections.Generic.List[string]
    foreach ($pattern in $patterns) {
        foreach ($match in [regex]::Matches($Html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)) {
            $value = Normalize-Text (Decode-Html $match.Groups[1].Value)
            if ($value -and -not $values.Contains($value)) { $values.Add($value) }
        }
    }
    return @($values)
}

function Get-FirstMetaContent {
    param([string]$Html, [string[]]$Names)
    foreach ($name in $Names) {
        $values = @(Get-MetaContents $Html $name)
        if ($values.Count -gt 0) { return $values[0] }
    }
    return ""
}

function Resolve-Url {
    param([string]$Href, [string]$CurrentUrl)
    if ([string]::IsNullOrWhiteSpace($Href)) { return "" }
    try {
        $base = [System.Uri]::new($CurrentUrl)
        return ([System.Uri]::new($base, (Decode-Html $Href))).AbsoluteUri -replace "#.*$", ""
    } catch {
        return ""
    }
}

function Get-CrawlerPage {
    param([string]$Url)
    $headers = @{
        "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        "Accept-Language" = "en-US,en;q=0.9"
        "User-Agent" = "Googlebot/2.1 (+http://www.google.com/bot.html)"
    }
    $content = (Invoke-WebRequest -UseBasicParsing $Url -TimeoutSec 60 -Headers $headers).Content
    if ($content -match "Just a moment|Enable JavaScript and cookies|_cf_chl|challenge-platform") {
        throw "Cloudflare challenge returned for crawler request."
    }
    return $content
}

function Get-ArticleLinks {
    param([string]$Html, [string]$CurrentUrl)
    $links = New-Object System.Collections.Generic.List[string]
    foreach ($match in [regex]::Matches($Html, "<a\b[^>]*href=['""]([^'""]+)['""][^>]*>", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
        $url = Resolve-Url $match.Groups[1].Value $CurrentUrl
        if ($url -match "/index\.php/[^/]+/article/view/\d+" -and -not $links.Contains($url)) {
            $links.Add($url)
        }
    }
    return @($links)
}

function Get-IssueLinks {
    param([string]$Html, [string]$CurrentUrl, [int]$MaxLinks)
    $links = New-Object System.Collections.Generic.List[string]
    foreach ($match in [regex]::Matches($Html, "<a\b[^>]*href=['""]([^'""]+)['""][^>]*>", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
        $url = Resolve-Url $match.Groups[1].Value $CurrentUrl
        if ($url -match "/index\.php/[^/]+/issue/view/\d+" -and -not $links.Contains($url)) {
            $links.Add($url)
            if ($links.Count -ge $MaxLinks) { break }
        }
    }
    return @($links)
}

function Get-VisibleField {
    param([string]$Text, [string]$StartLabel, [string]$EndLabel)
    return Get-RegexGroup $Text "\b$([regex]::Escape($StartLabel))\s+(.+?)\s+$([regex]::Escape($EndLabel))"
}

function Get-ArticleRecord {
    param([string]$Url)

    $html = Get-CrawlerPage $Url
    $text = Strip-Html $html
    $title = Get-FirstMetaContent $html @("citation_title", "DC.Title", "og:title", "twitter:title")
    if (-not $title) { $title = Get-RegexGroup $html "<h1[^>]*>(.*?)</h1>" }
    if (-not $title) { return $null }

    $authors = @(Get-MetaContents $html "citation_author")
    if ($authors.Count -eq 0) {
        $authorLine = Get-RegexGroup $text "\bMain Article Content\s+(.+?)\s+Abstract\b"
        $authors = @(($authorLine -split "\s*,\s*|\s+;\s+") | ForEach-Object { Normalize-Text ($_ -replace "\s*\(.*?\)", "") } | Where-Object { $_ -and $_ -notmatch "Image:|email|@" })
    }

    $journal = Get-FirstMetaContent $html @("citation_journal_title", "DC.Source")
    if (-not $journal) { $journal = Get-RegexGroup $html "<title[^>]*>.*?\|\s*(.*?)\s*</title>" }
    $journalSlug = Get-JournalSlug $Url $journal

    $firstPage = Get-FirstMetaContent $html @("citation_firstpage")
    $lastPage = Get-FirstMetaContent $html @("citation_lastpage")
    $pages = if ($firstPage -and $lastPage -and $firstPage -ne $lastPage) { "$firstPage-$lastPage" } elseif ($firstPage) { $firstPage } else { Get-VisibleField $text "Pages" "Published" }

    $publishedAt = Get-FirstMetaContent $html @("citation_publication_date", "DC.Date")
    if (-not $publishedAt) { $publishedAt = Get-RegexGroup $text "\bPublished\s+(\d{4}-\d{2}-\d{2})\b" }

    $doi = Get-FirstMetaContent $html @("citation_doi", "DC.Identifier")
    if ($doi -match "doi\.org/(.+)$") { $doi = $Matches[1] }
    if (-not $doi -or $doi -notmatch "10\.\d{4,9}/") { $doi = Get-RegexGroup $text "\bDOI\s+(10\.\d{4,9}/\S+)" }
    $doi = ($doi -replace "[\s\.,;]+$", "")

    $issue = Get-FirstMetaContent $html @("citation_issue")
    if (-not $issue) { $issue = Get-VisibleField $text "Issue" "Pages" }

    $abstract = Get-FirstMetaContent $html @("citation_abstract", "DC.Description", "description")
    if (-not $abstract) {
        $abstract = Get-RegexGroup $html "<h2[^>]*>\s*Abstract\s*</h2>(.*?)(?:<h2[^>]*>|<section[^>]*class=['""][^'""]*item\s+downloads|PDF Downloads Trend|Article Details)"
        $abstract = Strip-Html $abstract
    }

    return [pscustomobject]@{
        title = $title
        authors = @($authors)
        journal = $journal
        journalSlug = $journalSlug
        journalUrl = if ($journalSlug) { "$BaseUrl/$journalSlug" } else { "" }
        issue = $issue
        pages = $pages
        publishedAt = $publishedAt
        url = $Url
        doi = $doi
        abstract = $abstract
    }
}

$records = New-Object System.Collections.Generic.List[object]
$articleUrls = New-Object System.Collections.Generic.List[string]

foreach ($journalSlug in $JournalSlugs) {
    $journalBaseUrl = "$($BaseUrl.TrimEnd('/'))/$journalSlug"
    $seedUrls = @("$journalBaseUrl/issue/current", "$journalBaseUrl/issue/archive")
    $issueUrls = New-Object System.Collections.Generic.List[string]

    foreach ($seedUrl in $seedUrls) {
        Write-Host "Discovering issues from $seedUrl"
        $seedHtml = Get-CrawlerPage $seedUrl
        foreach ($issueUrl in @(Get-IssueLinks $seedHtml $seedUrl $MaxIssuesPerJournal)) {
            if (-not $issueUrls.Contains($issueUrl)) { $issueUrls.Add($issueUrl) }
        }
        foreach ($articleUrl in @(Get-ArticleLinks $seedHtml $seedUrl)) {
            if (-not $articleUrls.Contains($articleUrl)) { $articleUrls.Add($articleUrl) }
        }
        if ($RequestDelaySeconds -gt 0) { Start-Sleep -Seconds $RequestDelaySeconds }
    }

    foreach ($issueUrl in @($issueUrls | Select-Object -First $MaxIssuesPerJournal)) {
        Write-Host "Discovering articles from $issueUrl"
        $issueHtml = Get-CrawlerPage $issueUrl
        foreach ($articleUrl in @(Get-ArticleLinks $issueHtml $issueUrl)) {
            if (-not $articleUrls.Contains($articleUrl)) { $articleUrls.Add($articleUrl) }
        }
        if ($articleUrls.Count -ge $MaxArticlesToCrawl) { break }
        if ($RequestDelaySeconds -gt 0) { Start-Sleep -Seconds $RequestDelaySeconds }
    }
    if ($articleUrls.Count -ge $MaxArticlesToCrawl) { break }
}

foreach ($articleUrl in @($articleUrls | Select-Object -First $MaxArticlesToCrawl)) {
    Write-Host "Fetching article $articleUrl"
    $record = Get-ArticleRecord $articleUrl
    if ($null -ne $record) { $records.Add($record) }
    if ($RequestDelaySeconds -gt 0) { Start-Sleep -Seconds $RequestDelaySeconds }
}

$today = (Get-Date).Date
$eligibleRecords = if ($IncludeFuture) {
    $records
} else {
    $records | Where-Object {
        if (-not $_.publishedAt) { return $true }
        try { ([datetime]$_.publishedAt).Date -le $today } catch { $true }
    }
}

$recentPool = @($eligibleRecords |
    Sort-Object @{ Expression = { if ($_.publishedAt) { [datetime]$_.publishedAt } else { [datetime]::MinValue } }; Descending = $true }, title |
    Group-Object url, title |
    ForEach-Object { $_.Group[0] } |
    Select-Object -First $PoolLimit)

$seed = [int](Get-Date -Format "yyyyMMdd")
$rng = [System.Random]::new($seed)
$selected = @($recentPool | Sort-Object { $rng.NextDouble() } | Select-Object -First $Limit)

$payload = [pscustomobject]@{
    harvestedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    sourcePublisher = "Panorama Scholarly Group"
    metadataSource = "Panorama Googlebot-style HTML crawler"
    selectionMode = "daily-random-from-recent-panorama-publications"
    randomSeed = $seed
    totalRecordsHarvested = $records.Count
    futureRecordsExcluded = $records.Count - @($eligibleRecords).Count
    recentPoolLimit = $PoolLimit
    recentPoolSize = $recentPool.Count
    selectedArticleCount = $selected.Count
    articles = @($selected)
}

$outputPath = $script:OutputPath
$outputDir = Split-Path -Parent $outputPath
if ($outputDir) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "Wrote $($selected.Count) selected articles from $($records.Count) crawled article records to $outputPath"
