param(
    [string]$Endpoint = "https://journals.panorama-sg.com/index.php/index/oai",
    [string]$Output = "data/articles.json",
    [int]$Limit = 20,
    [int]$PoolLimit = 50,
    [int]$MaxPages = 20,
    [int]$RequestDelaySeconds = 6,
    [switch]$IncludeFuture
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$script:OutputPath = if ([System.IO.Path]::IsPathRooted($Output)) {
    $Output
} else {
    Join-Path (Get-Location) $Output
}

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

    @(
        $Node.SelectNodes($Path, $NamespaceManager) |
        ForEach-Object { Normalize-Text $_.InnerText } |
        Where-Object { $_ }
    )
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
        issue   = $issue
        pages   = $pages
    }
}

function Get-JournalSlug {
    param([string[]]$SetSpecs, [string]$Journal)

    $setSlugMap = @{
        "afs"         = "AFS"
        "csgs"        = "CSGS"
        "files"       = "files"
        "healthnexus" = "HealthNexus"
        "jesa"        = "JESA"
        "jlpcs"       = "JLPCS"
        "jscc"        = "JSCC"
        "pemr"        = "PEMR"
        "resonance"   = "Resonance"
        "rggd"        = "RGGD"
        "silence"     = "Silence"
        "tts"         = "tts"
    }

    foreach ($setSpec in $SetSpecs) {
        if (-not $setSpec) { continue }

        $prefix = (($setSpec -split ":")[0]).ToLowerInvariant()

        if ($setSlugMap.ContainsKey($prefix)) {
            return $setSlugMap[$prefix]
        }
    }

    $journalSlugMap = @{
        "ai & future society"                                      = "AFS"
        "climate sustainability & global systems"                  = "CSGS"
        "global review of humanities, arts, and society"           = "files"
        "health nexus"                                             = "HealthNexus"
        "journal of engineering systems and applications"          = "JESA"
        "journal of law, psychology, and communication studies"     = "JLPCS"
        "journal of social cognition and communication"            = "JSCC"
        "poliecom administration review"                           = "PEMR"
        "resonance: journal of global music studies"               = "Resonance"
        "silence"                                                  = "Silence"
        "three teachings studies: confucianism, daoism, and buddhism" = "tts"
        "乡村善治与绿色发展"                                      = "RGGD"
    }

    $key = (Normalize-Text $Journal).ToLowerInvariant()

    if ($journalSlugMap.ContainsKey($key)) {
        return $journalSlugMap[$key]
    }

    return ""
}

function Get-JournalArticleUrl {
    param([string]$OriginalUrl, [string]$JournalSlug)

    if (-not $OriginalUrl -or -not $JournalSlug) {
        return $OriginalUrl
    }

    return ($OriginalUrl -replace "/index/article/view/", "/$JournalSlug/article/view/")
}

function Test-IsCloudflareChallenge {
    param(
        [string]$Content,
        $ResponseHeaders = $null
    )

    if ($null -ne $ResponseHeaders) {
        try {
            $cfMitigated = [string]$ResponseHeaders["cf-mitigated"]

            if ($cfMitigated -match "(?i)^challenge$") {
                return $true
            }
        } catch {
            # Some PowerShell header collections do not support direct key lookup.
        }
    }

    if ([string]::IsNullOrWhiteSpace($Content)) {
        return $false
    }

    # Keep this list narrow.
    # Do not classify generic HTML, normal OJS pages, or the word "Cloudflare" alone as a challenge.
    $challengePatterns = @(
        "Just a moment",
        "Enable JavaScript and cookies",
        "__cf_chl",
        "cf_chl",
        "challenge-platform",
        "/cdn-cgi/challenge-platform/",
        "cf_clearance",
        "Checking your browser before accessing"
    )

    foreach ($pattern in $challengePatterns) {
        if ($Content -match [regex]::Escape($pattern)) {
            return $true
        }
    }

    return $false
}

function Get-OaiPage {
    param([string]$Url)

    $maxRetries = 3
    $retryCount = 0

    while ($retryCount -lt $maxRetries) {
        try {
            $headers = @{
                "Accept"            = "application/xml,text/xml,*/*"
                "User-Agent"        = "PanoramaScholarlyGroupSiteDataBot/1.0 (+https://panorama-sg.com/)"
                "X-PSG-Build-Bot"   = "panorama-homepage"
                "Accept-Encoding"   = "gzip, deflate"
                "Accept-Language"   = "en-US,en;q=0.9"
                "Cache-Control"     = "no-cache"
                "Pragma"            = "no-cache"
            }

            $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 60 -Headers $headers -SkipHttpErrorCheck
            $content = $response.Content

            if ([string]::IsNullOrWhiteSpace($content)) {
                throw "OAI endpoint returned an empty response."
            }

            if (Test-IsCloudflareChallenge -Content $content -ResponseHeaders $response.Headers) {
                $retryCount++

                if ($retryCount -lt $maxRetries) {
                    $waitTime = [Math]::Min(5 * $retryCount, 15)
                    Write-Warning "Cloudflare challenge detected. Retrying in $waitTime seconds (attempt $retryCount/$maxRetries)..."
                    Start-Sleep -Seconds $waitTime
                    continue
                } else {
                    throw "Cloudflare challenge returned persistently for OAI endpoint after $maxRetries attempts."
                }
            }

            if ($response.StatusCode -ne 200) {
                $contentPreview = Normalize-Text $content

                if ($contentPreview.Length -gt 220) {
                    $contentPreview = $contentPreview.Substring(0, 220) + "..."
                }

                throw "OAI endpoint returned HTTP $($response.StatusCode). Response preview: $contentPreview"
            }

            try {
                [xml]$xml = $content

                if ($null -eq $xml.DocumentElement) {
                    throw "Missing XML document element."
                }

                if ($xml.DocumentElement.LocalName -ne "OAI-PMH") {
                    throw "Unexpected XML root element: $($xml.DocumentElement.LocalName)"
                }

                return $xml
            } catch {
                $contentPreview = Normalize-Text $content

                if ($contentPreview.Length -gt 220) {
                    $contentPreview = $contentPreview.Substring(0, 220) + "..."
                }

                throw "OAI endpoint returned invalid or unexpected XML content: $($_.Exception.Message). Response preview: $contentPreview"
            }
        } catch {
            if ($retryCount -lt $maxRetries - 1) {
                $retryCount++
                $waitTime = [Math]::Min(5 * $retryCount, 15)

                Write-Warning "Request failed: $($_.Exception.Message). Retrying in $waitTime seconds..."
                Start-Sleep -Seconds $waitTime
            } else {
                throw $_
            }
        }
    }
}

$records = New-Object System.Collections.Generic.List[object]
$url = "$Endpoint`?verb=ListRecords&metadataPrefix=oai_dc"
$page = 0

while ($url -and $page -lt $MaxPages) {
    $page += 1
    Write-Host "Fetching OAI page $page"

    $xml = Get-OaiPage $url

    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("oai", "http://www.openarchives.org/OAI/2.0/")
    $ns.AddNamespace("dc", "http://purl.org/dc/elements/1.1/")

    foreach ($record in $xml.SelectNodes("//oai:record", $ns)) {
        $title = Get-NodeText $record ".//dc:title" $ns

        if (-not $title) {
            continue
        }

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
            title       = $title
            authors     = @(Get-NodeTexts $record ".//dc:creator" $ns)
            journal     = $sourceParts.journal
            journalSlug = $journalSlug
            journalUrl  = if ($journalSlug) { "https://journals.panorama-sg.com/index.php/$journalSlug" } else { "" }
            issue       = $sourceParts.issue
            pages       = $sourceParts.pages
            publishedAt = Get-NodeText $record ".//dc:date" $ns
            url         = $articleUrl
            doi         = if ($doiIdentifier.Count) { $doiIdentifier[0] } else { "" }
            abstract    = Get-NodeText $record ".//dc:description" $ns
        })
    }

    $tokenNode = $xml.SelectSingleNode("//oai:resumptionToken", $ns)

    if ($null -ne $tokenNode -and -not [string]::IsNullOrWhiteSpace($tokenNode.InnerText)) {
        $token = [uri]::EscapeDataString((Normalize-Text $tokenNode.InnerText))
        $url = "$Endpoint`?verb=ListRecords&resumptionToken=$token"

        if ($RequestDelaySeconds -gt 0) {
            Write-Host "Waiting $RequestDelaySeconds seconds before the next OAI page"
            Start-Sleep -Seconds $RequestDelaySeconds
        }
    } else {
        $url = $null
    }
}

$today = (Get-Date).Date

$eligibleRecords = if ($IncludeFuture) {
    $records
} else {
    $records | Where-Object {
        if (-not $_.publishedAt) {
            return $true
        }

        try {
            ([datetime]$_.publishedAt).Date -le $today
        } catch {
            $true
        }
    }
}

$recentPool = @(
    $eligibleRecords |
    Sort-Object @{
        Expression = {
            if ($_.publishedAt) {
                [datetime]$_.publishedAt
            } else {
                [datetime]::MinValue
            }
        }
        Descending = $true
    }, title |
    Group-Object url, title |
    ForEach-Object { $_.Group[0] } |
    Select-Object -First $PoolLimit
)

$seed = [int](Get-Date -Format "yyyyMMdd")
$rng = [System.Random]::new($seed)

$selected = @(
    $recentPool |
    Sort-Object { $rng.NextDouble() } |
    Select-Object -First $Limit
)

$payload = [pscustomobject]@{
    harvestedAt           = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    sourcePublisher       = "Panorama Scholarly Group"
    metadataSource        = "Panorama journal article records"
    selectionMode         = "daily-random-from-recent-panorama-publications"
    randomSeed            = $seed
    totalRecordsHarvested = $records.Count
    futureRecordsExcluded = $records.Count - @($eligibleRecords).Count
    recentPoolLimit       = $PoolLimit
    recentPoolSize        = $recentPool.Count
    selectedArticleCount  = $selected.Count
    articles              = @($selected)
}

$outputPath = $script:OutputPath
$outputDir = Split-Path -Parent $outputPath

if ($outputDir) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "Wrote $($selected.Count) selected articles from $($records.Count) OAI records to $outputPath"
