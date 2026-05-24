param(
    [string]$Endpoint = "https://journals.panorama-sg.com/index.php/index/oai",
    [string]$Output = "data/selected-recent-articles.json",
    [int]$Limit = 10,
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

function Get-OaiPage {
    param([string]$Url)
    [xml]((Invoke-WebRequest -UseBasicParsing $Url -TimeoutSec 60).Content)
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
        if (-not $title) { continue }

        $identifiers = Get-NodeTexts $record ".//dc:identifier" $ns
        $urlIdentifier = @($identifiers | Where-Object { $_ -match "^https?://" -and $_ -notmatch "doi\.org" } | Select-Object -First 1)
        $doiIdentifier = @($identifiers | Where-Object { $_ -match "10\.\d{4,9}/" -or $_ -match "doi\.org/" } | Select-Object -First 1)
        $source = Get-NodeText $record ".//dc:source" $ns
        $sourceParts = Split-Source $source

        $records.Add([pscustomobject]@{
            title = $title
            authors = @(Get-NodeTexts $record ".//dc:creator" $ns)
            journal = $sourceParts.journal
            issue = $sourceParts.issue
            pages = $sourceParts.pages
            publishedAt = Get-NodeText $record ".//dc:date" $ns
            url = if ($urlIdentifier.Count) { $urlIdentifier[0] } else { "" }
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
$eligibleRecords = if ($IncludeFuture) {
    $records
} else {
    $records | Where-Object {
        if (-not $_.publishedAt) { return $true }
        try { ([datetime]$_.publishedAt).Date -le $today } catch { $true }
    }
}

$selected = $eligibleRecords |
    Sort-Object @{ Expression = { if ($_.publishedAt) { [datetime]$_.publishedAt } else { [datetime]::MinValue } }; Descending = $true }, title |
    Group-Object url, title |
    ForEach-Object { $_.Group[0] } |
    Select-Object -First $Limit

$payload = [pscustomobject]@{
    harvestedAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    sourceEndpoint = $Endpoint
    totalRecordsHarvested = $records.Count
    futureRecordsExcluded = $records.Count - @($eligibleRecords).Count
    articles = @($selected)
}

$outputPath = if ([System.IO.Path]::IsPathRooted($Output)) { $Output } else { Join-Path (Get-Location) $Output }
$outputDir = Split-Path -Parent $outputPath
if ($outputDir) { New-Item -ItemType Directory -Force -Path $outputDir | Out-Null }

$json = $payload | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host "Wrote $($selected.Count) selected articles from $($records.Count) OAI records to $outputPath"
