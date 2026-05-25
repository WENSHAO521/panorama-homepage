param(
    [string]$Output = "data/journals.json"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Normalize-Text {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return "" }
    $plain = $Value -replace "<[^>]+>", " "
    $decoded = [System.Net.WebUtility]::HtmlDecode($plain)
    return (($decoded -replace [char]0x00A0, " ") -replace "\s+", " ").Trim()
}

function Get-MetaContent {
    param([string]$Html, [string[]]$Names)

    foreach ($name in $Names) {
        $escaped = [regex]::Escape($name)
        $patterns = @(
            "<meta\b(?=[^>]*(?:name|property)=[""']$escaped[""'])(?=[^>]*content=[""'](?<content>[^""']+)[""'])[^>]*>",
            "<meta\b(?=[^>]*content=[""'](?<content>[^""']+)[""'])(?=[^>]*(?:name|property)=[""']$escaped[""'])[^>]*>"
        )
        foreach ($pattern in $patterns) {
            $match = [regex]::Match($Html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            if ($match.Success) {
                $text = Normalize-Text $match.Groups["content"].Value
                if ($text) { return $text }
            }
        }
    }
    return ""
}

function Get-HomeDescription {
    param([string]$Html)

    $meta = Get-MetaContent $Html @("description", "og:description", "twitter:description", "DC.Description")
    if ($meta) { return $meta }

    $sectionPatterns = @(
        "<section[^>]+class=[""'][^""']*additional_content[^""']*[""'][^>]*>(?<body>.*?)</section>",
        "<div[^>]+class=[""'][^""']*additional_content[^""']*[""'][^>]*>(?<body>.*?)</div>",
        "<div[^>]+class=[""'][^""']*journal-description[^""']*[""'][^>]*>(?<body>.*?)</div>"
    )

    foreach ($pattern in $sectionPatterns) {
        $match = [regex]::Match($Html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($match.Success) {
            $text = Normalize-Text $match.Groups["body"].Value
            if ($text.Length -gt 40) { return $text }
        }
    }
    return ""
}

function Test-JournalDescription {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
    if ($Value.Length -lt 70) { return $false }
    $badPatterns = @(
        "pointer-events",
        "data-testid",
        "conversation-turn",
        "data-turn-id",
        "request-[0-9a-f-]+",
        "csrf-token",
        "Open Journal Systems",
        "window\.",
        "function\s*\(",
        "\{[^}]{20,}\}",
        "^\s*Global Review of Humanities"
    )
    foreach ($pattern in $badPatterns) {
        if ($Value -match $pattern) { return $false }
    }
    return $true
}

function Get-JournalDescription {
    param([string]$Slug)

    $baseUrl = "https://journals.panorama-sg.com/index.php/$Slug"
    $candidateUrls = @(
        $baseUrl,
        "$baseUrl/about",
        "$baseUrl/AimsScope",
        "$baseUrl/Journal"
    )

    foreach ($candidateUrl in $candidateUrls) {
        $html = Get-UrlContent $candidateUrl
        if (-not $html) { continue }
        $description = Get-HomeDescription $html
        if (Test-JournalDescription $description) {
            return [pscustomobject]@{
                description = $description
                source = $candidateUrl
            }
        }
    }

    return [pscustomobject]@{
        description = ""
        source = ""
    }
}

function Get-UrlContent {
    param([string]$Url)
    try {
        return (Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 60).Content
    } catch {
        Write-Warning "Unable to fetch $Url"
        return ""
    }
}

$journals = @(
    @{ id = "PFR"; group = "tech"; title = "Panorama Frontier Review"; cat = "Multi."; issn = "Pending"; img = "PFR.png"; slug = "PFR" },
    @{ id = "AFS"; group = "tech"; title = "AI & Future Society"; cat = "Tech"; issn = "3053-4011"; img = "AFS.png"; slug = "AFS" },
    @{ id = "JESA"; group = "tech"; title = "Journal of Engineering Systems & Applications"; cat = "Eng."; issn = "3053-478X"; img = "JESA.png"; slug = "JESA" },
    @{ id = "HNDH"; group = "tech"; title = "Health Nexus: Digital Health and Medical AI"; cat = "Med AI"; issn = "Pending"; img = "HNDH.png"; slug = "HNDH" },
    @{ id = "CSGS"; group = "env"; title = "Climate Sustainability & Global Systems"; cat = "Env."; issn = "3054-9663"; img = "CSGS.png"; slug = "CSGS" },
    @{ id = "RGGD"; group = "env"; title = "Rural Governance & Green Development"; cat = "Env."; issn = "3053-7282"; img = "RGGD.png"; slug = "RGGD" },
    @{ id = "HN"; group = "env"; title = "Health Nexus"; cat = "Med"; issn = "3053-7037"; img = "HealthNexus.png"; slug = "HealthNexus" },
    @{ id = "FSSS"; group = "env"; title = "Food Systems, Safety & Sustainability"; cat = "Food Sci."; issn = "Pending"; img = "FSSS.png"; slug = "FSSS" },
    @{ id = "SES"; group = "env"; title = "Journal of Sport and Exercise Studies"; cat = "Sports"; issn = "Pending"; img = "SES.png"; slug = "SES" },
    @{ id = "GPPGR"; group = "soc"; title = "Global Public Policy & Governance Review"; cat = "Policy"; issn = "Pending"; img = "GPPGR.png"; slug = "GPPGR" },
    @{ id = "PEMR"; group = "soc"; title = "PoliEcoM Administration Review"; cat = "Policy"; issn = "3053-3597"; img = "REMR.png"; slug = "PEMR" },
    @{ id = "CSSR"; group = "soc"; title = "Computational Social Sciences Review"; cat = "Data"; issn = "Pending"; img = "CSSR.png"; slug = "cssr" },
    @{ id = "JLPCS"; group = "soc"; title = "Journal of Law, Psychology, & Communication"; cat = "Law"; issn = "3052-9654"; img = "JLPCS.png"; slug = "JLPCS" },
    @{ id = "IRELS"; group = "soc"; title = "International Review of Education & Learning"; cat = "Edu"; issn = "Pending"; img = "IRELS.png"; slug = "IRELS" },
    @{ id = "JSCC"; group = "soc"; title = "Journal of Social Cognition and Communication"; cat = "Soc."; issn = "3054-6958"; img = "JSCC.png"; slug = "JSCC" },
    @{ id = "CRoPT"; group = "soc"; title = "Contemporary Review of Political Thought"; cat = "Pol."; issn = "Pending"; img = "CRoPT.png"; slug = "CRoPT" },
    @{ id = "Silence"; group = "arts"; title = "Silence"; cat = "Phil."; issn = "3054-4386"; img = "Silence.png"; slug = "Silence" },
    @{ id = "GRHAS"; group = "arts"; title = "Global Review of Humanities, Arts, & Society"; cat = "Arts"; issn = "3052-539X"; img = "GRAHS.png"; slug = "files" },
    @{ id = "TTS"; group = "arts"; title = "Three Teachings Studies"; cat = "Phil."; issn = "3053-6553"; img = "TTS.png"; slug = "tts" },
    @{ id = "Res"; group = "arts"; title = "Resonance"; cat = "Music"; issn = "3053-4410"; img = "RESONANCE.png"; slug = "Resonance" },
    @{ id = "CPRT"; group = "arts"; title = "Comparative Philosophy & Religious Traditions"; cat = "Phil."; issn = "Pending"; img = "CPRT.png"; slug = "CPRT" },
    @{ id = "JDES"; group = "arts"; title = "Journal of Dance and Embodied Structure"; cat = "Arts"; issn = "Pending"; img = "JDES.png"; slug = "JDES" }
)

$items = foreach ($journal in $journals) {
    $url = "https://journals.panorama-sg.com/index.php/$($journal.slug)"
    Write-Host "Fetching $($journal.id): $url"
    $descriptionRecord = Get-JournalDescription $journal.slug
    $description = $descriptionRecord.description
    if ($description.Length -gt 520) {
        $description = $description.Substring(0, 520).TrimEnd() + "..."
    }

    [pscustomobject]@{
        id = $journal.id
        group = $journal.group
        title = $journal.title
        cat = $journal.cat
        issn = $journal.issn
        img = $journal.img
        slug = $journal.slug
        journalUrl = $url
        submissionUrl = "$url/submission"
        description = $description
        descriptionSource = $descriptionRecord.source
    }
}

$payload = [pscustomobject]@{
    harvestedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    sourcePublisher = "Panorama Scholarly Group"
    source = "Panorama journal home pages"
    journalCount = @($items).Count
    journals = @($items)
}

$outputPath = if ([System.IO.Path]::IsPathRooted($Output)) { $Output } else { Join-Path (Get-Location) $Output }
$outputDir = Split-Path -Parent $outputPath
if ($outputDir) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "Wrote $(@($items).Count) journal records to $outputPath"
