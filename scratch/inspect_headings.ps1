$html = (Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing).Content
$matches = [regex]::Matches($html, '<p class="why-use-item-title">.*?</p>')
foreach ($m in $matches) {
  Write-Host $m.Value
}
