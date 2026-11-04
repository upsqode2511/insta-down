$r = Invoke-WebRequest -Uri 'http://localhost:3000/sitemap.xml' -UseBasicParsing
Write-Host "Content-Type: $($r.Headers['Content-Type'])"
Write-Host "Headers:"
$r.Headers.GetEnumerator() | ForEach-Object { Write-Host "  $($_.Key): $($_.Value)" }
Write-Host "`nPreview:"
Write-Host $r.Content.Substring(0, 300)
