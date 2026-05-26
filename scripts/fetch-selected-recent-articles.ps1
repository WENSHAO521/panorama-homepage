param(
    [string]$Endpoint = "https://journals.panorama-sg.com/index.php/index/oai",
    [string]$Output = "data/articles.json",
    [int]$Limit = 20,
    [int]$PoolLimit = 100,
    [int]$MaxPages = 20,
    [switch]$IncludeFuture
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

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

function Split-Source {
    param([string]$Source)
    $parts = @(($Source -split ";") | ForEach-Object { Normalize-Text $_ } | Where-Object { $_ })
    $journal = if ($parts.Count -ge 1) { $parts[0] } else { "" }
    $pages = if ($parts.Count -ge 3) { $parts[$parts.Count - 1] } else { "" }
    $issue = if ($parts.Count -ge 3) {
        ($parts[1..($parts.Count - 2)] -join "; ")
    } elseif ($parts.Count -eq 2) {
        $parts[1]
    } else {
        ""
    }

    [pscustomobject]@{
        journal = $journal
        issue = $issue
        pages = $pages
    }
}

function Get-JournalSlug {
    param([string[]]$SetSpecs, [string]$Journal)

    $setSlugMap = @{
        "afs" = "AFS"
        "csgs" = "CSGS"
        "files" = "files"
        "healthnexus" = "HealthNexus"
        "jesa" = "JESA"
        "jlpcs" = "JLPCS"
        "jscc" = "JSCC"
        "pemr" = "PEMR"
        "resonance" = "Resonance"
        "rggd" = "RGGD"
        "silence" = "Silence"
        "tts" = "tts"
    }

    foreach ($setSpec in $SetSpecs) {
        if (-not $setSpec) { continue }
        $prefix = (($setSpec -split ":")[0]).ToLowerInvariant()
        if ($setSlugMap.ContainsKey($prefix)) { return $setSlugMap[$prefix] }
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

function Get-JournalArticleUrl {
    param([string]$OriginalUrl, [string]$JournalSlug)
    if (-not $OriginalUrl -or -not $JournalSlug) { return $OriginalUrl }
    return ($OriginalUrl -replace "/index/article/view/", "/$JournalSlug/article/view/")
}

function Get-OaiPage {
    param([string]$Url)
    $headers = @{
        "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        "Accept" = "application/xml,text/xml;q=0.9,*/*;q=0.8"
        "Accept-Language" = "en-US,en;q=0.9"
        "Cache-Control" = "no-cache"
        "Pragma" = "no-cache"
    }

    $maxAttempts = 3
    for ($attempt = 1; $attempt -le $maxAttempts; $attempt += 1) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Headers $headers $Url -TimeoutSec 60
            $contentType = "$($response.Headers['Content-Type'])"
            $content = "$($response.Content)"

            if ($contentType -notmatch "xml" -or $content -match "Enable JavaScript and cookies to continue" -or $content -match "__cf_chl") {
                throw "OAI endpoint returned a non-XML anti-bot challenge page."
            }

            return [xml]$content
        } catch {
            if ($attempt -eq $maxAttempts) { throw }
            $sleepSeconds = [math]::Pow(2, $attempt)
            Write-Warning "Attempt $attempt/$maxAttempts failed for '$Url': $($_.Exception.Message). Retrying in $sleepSeconds seconds..."
            Start-Sleep -Seconds $sleepSeconds
        }
    }
}

$records = New-Object System.Collections.Generic.List[object]
$url = "$Endpoint`?verb=ListRecords&metadataPrefix=oai_dc"
$page = 0

while ($url -and $page -lt $MaxPages) {
    $page += 1
    Write-Host "Fetching OAI page $page"

    try {
        $xml = Get-OaiPage $url
    } catch {
        Write-Warning "Failed to fetch OAI page $page from '$url': $($_.Exception.Message)"
        break
    }

    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("oai", "http://www.openarchives.org/OAI/2.0/")
    $ns.AddNamespace("dc", "http://purl.org/dc/elements/1.1/")

    foreach ($record in $xml.SelectNodes("//oai:record", $ns)) {
        $title = Get-NodeText $record ".//dc:title" $ns
        if (-not $title) { continue }

        $identifiers = Get-NodeTexts $record ".//dc:identifier" $ns
        $urlIdentifier = @($identifiers | Where-Object { $_ -match "^https?://" -and $_ -notmatch "doi\.org" } | Select-Object -First 1)
        $doiIdentifier = @($identifiers | Where-Object { $_ -match "10\.\d{4,9}/" -or $_ -match "doi\.org/" } | Select-Object -First 1)
        $source = Get-NodeText $record ".//dc:source" $ns
        $sourceParts = Split-Source $source
        $setSpecs = @(Get-NodeTexts $record "./oai:header/oai:setSpec" $ns)
        $journalSlug = Get-JournalSlug $setSpecs $sourceParts.journal
        $originalUrl = if ($urlIdentifier.Count) { $urlIdentifier[0] } else { "" }
        $articleUrl = Get-JournalArticleUrl $originalUrl $journalSlug

        $records.Add([pscustomobject]@{
            title = $title
            authors = @(Get-NodeTexts $record ".//dc:creator" $ns)
            journal = $sourceParts.journal
            journalSlug = $journalSlug
            journalUrl = if ($journalSlug) { "https://journals.panorama-sg.com/index.php/$journalSlug" } else { "" }
            issue = $sourceParts.issue
            pages = $sourceParts.pages
            publishedAt = Get-NodeText $record ".//dc:date" $ns
            url = $articleUrl
            doi = if ($doiIdentifier.Count) { $doiIdentifier[0] } else { "" }
            abstract = Get-NodeText $record ".//dc:description" $ns
        })
    }

    $tokenNode = $xml.SelectSingleNode("//oai:resumptionToken", $ns)
    if ($null -ne $tokenNode -and -not [string]::IsNullOrWhiteSpace($tokenNode.InnerText)) {
        $token = [uri]::EscapeDataString((Normalize-Text $tokenNode.InnerText))
        $url = "$Endpoint`?verb=ListRecords&resumptionToken=$token"
    } else {
        $url = $null
    }
}

$today = (Get-Date).Date

if ($records.Count -eq 0) {
    $outputPath = if ([System.IO.Path]::IsPathRooted($Output)) { $Output } else { Join-Path (Get-Location) $Output }
    if (Test-Path $outputPath) {
        Write-Warning "No OAI records were fetched. Keeping existing output file: $outputPath"
        exit 0
    }

    Write-Warning "No OAI records were fetched and no existing output file is available at '$outputPath'. Writing an empty payload."
    $emptyPayload = [pscustomobject]@{
        harvestedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
        sourcePublisher = "Panorama Scholarly Group"
        metadataSource = "Panorama journal article records"
        selectionMode = "daily-random-from-recent-panorama-publications"
        randomSeed = [int](Get-Date -Format "yyyyMMdd")
        totalRecordsHarvested = 0
        futureRecordsExcluded = 0
        recentPoolLimit = $PoolLimit
        recentPoolSize = 0
        selectedArticleCount = 0
        articles = @()
    }

    $outputDir = Split-Path -Parent $outputPath
    if ($outputDir) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }
    $emptyJson = $emptyPayload | ConvertTo-Json -Depth 8
    [System.IO.File]::WriteAllText($outputPath, $emptyJson, [System.Text.UTF8Encoding]::new($false))
    Write-Warning "Wrote empty selected-articles payload to $outputPath"
    exit 0
}

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
    metadataSource = "Panorama journal article records"
    selectionMode = "daily-random-from-recent-panorama-publications"
    randomSeed = $seed
    totalRecordsHarvested = $records.Count
    futureRecordsExcluded = $records.Count - @($eligibleRecords).Count
    recentPoolLimit = $PoolLimit
    recentPoolSize = $recentPool.Count
    selectedArticleCount = $selected.Count
    articles = @($selected)
}

$outputPath = if ([System.IO.Path]::IsPathRooted($Output)) { $Output } else { Join-Path (Get-Location) $Output }
$outputDir = Split-Path -Parent $outputPath
if ($outputDir) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "Wrote $($selected.Count) selected articles from $($records.Count) OAI records to $outputPath"
