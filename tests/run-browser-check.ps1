param(
  [ValidateSet('Edge','Chrome')][string]$Browser = 'Edge',
  [ValidateSet(360,768,1440)][int]$Width = 1440,
  [switch]$Matrix
)
$ErrorActionPreference = 'Stop'
if ($Matrix) {
  foreach ($matrixBrowser in @('Edge','Chrome')) {
    foreach ($matrixWidth in @(360,768,1440)) {
      & $PSCommandPath -Browser $matrixBrowser -Width $matrixWidth
    }
  }
  exit 0
}
$projectDirectory = Split-Path -Parent $PSScriptRoot
$artifactDirectory = Join-Path $PSScriptRoot 'artifacts'
New-Item -ItemType Directory -Path $artifactDirectory -Force | Out-Null
$browserPath = if ($Browser -eq 'Edge') { 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' } else { 'C:\Program Files\Google\Chrome\Application\chrome.exe' }
if (-not (Test-Path -LiteralPath $browserPath)) { throw "Browser nicht vorhanden: $browserPath" }
$captureErrors = '<script>window.__reviewErrors=[];window.addEventListener("error",function(e){window.__reviewErrors.push(e.message||"Ressourcenfehler");},true);window.addEventListener("unhandledrejection",function(e){window.__reviewErrors.push(String(e.reason));});</script>'
$source = Get-Content -LiteralPath (Join-Path $projectDirectory 'index.html') -Raw -Encoding UTF8
$source = $source.Replace('<head>', '<head><base href="../../">' + $captureErrors)
$source = $source.Replace('</head>', '<script defer src="tests/browser-check.js"></script></head>')
$contentPage = Join-Path $artifactDirectory 'browser-review-content.html'
[System.IO.File]::WriteAllText($contentPage,$source,[System.Text.UTF8Encoding]::new($false))
$testPage = Join-Path $artifactDirectory 'browser-review.html'
# Ein iframe ermöglicht auch unterhalb der nativen Mindestfensterbreite einen echten CSS-Viewport.
$wrapper = '<!doctype html><html><head><meta charset="utf-8"><title>Lokale Browserprüfung</title><style>html,body{margin:0;background:#f5f6f2}iframe{display:block;border:0;width:' + $Width + 'px;height:1050px}</style></head><body><iframe id="review-frame" title="Knowledge Command Center" src="browser-review-content.html"></iframe><script>addEventListener("message",function(e){if(e.source!==document.getElementById("review-frame").contentWindow||e.data.type!=="second-brain-review")return;var pre=document.createElement("pre");pre.id="browser-test-results";pre.hidden=true;pre.textContent=JSON.stringify(e.data.report);document.body.append(pre);});</script></body></html>'
[System.IO.File]::WriteAllText($testPage,$wrapper,[System.Text.UTF8Encoding]::new($false))
$prefix = Join-Path $artifactDirectory "$($Browser.ToLower())-$Width"
$profileDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ('second-brain-review-' + [guid]::NewGuid().ToString('N'))
$fileUrl = ([System.Uri]::new($testPage)).AbsoluteUri
$windowWidth = [Math]::Max(600,$Width + 24)
$arguments = @('--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-extensions','--force-device-scale-factor=1',"--window-size=$windowWidth,1100",'--virtual-time-budget=12000','--dump-dom',"--user-data-dir=$profileDirectory","--screenshot=$prefix.png",$fileUrl)
$argumentLine = ($arguments | ForEach-Object { '"' + $_ + '"' }) -join ' '
$process = Start-Process -FilePath $browserPath -ArgumentList $argumentLine -WindowStyle Hidden -PassThru -RedirectStandardOutput "$prefix.html" -RedirectStandardError "$prefix.stderr.log"
if (-not $process.WaitForExit(45000)) { Stop-Process -Id $process.Id; throw 'Browser-Prüfung nach 45 Sekunden abgebrochen.' }
$dom = Get-Content -LiteralPath "$prefix.html" -Raw -Encoding UTF8
$match = [regex]::Match($dom,'<pre id="browser-test-results"[^>]*>([\s\S]*?)</pre>')
if (-not $match.Success) { throw "Kein Testergebnis gefunden. Siehe $prefix.stderr.log" }
$json = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
[System.IO.File]::WriteAllText("$prefix.json",$json,[System.Text.UTF8Encoding]::new($false))
$result = $json | ConvertFrom-Json
$failed = @($result.results | Where-Object { -not $_.passed })
[pscustomobject]@{Browser=$Browser;RequestedWidth=$Width;ActualWidth=$result.viewport.width;Passed=@($result.results | Where-Object passed).Count;Failed=$failed.Count;Errors=@($result.errors).Count;Screenshot="$prefix.png"} | Format-List
if ($result.viewport.width -ne $Width) { throw "Viewport stimmt nicht: $($result.viewport.width) statt $Width" }
if ($failed.Count -or @($result.errors).Count) { $failed | Format-List; $result.errors; exit 1 }
