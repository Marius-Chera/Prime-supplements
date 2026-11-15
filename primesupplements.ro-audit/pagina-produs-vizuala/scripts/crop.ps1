# Decupaj 4:5 (toată înălțimea) centrat la fracția cx din lățime -> poze\jpg\<nume>.jpg (1600x2000, q88) + prev\<nume>.jpg
param([string]$src, [double]$cx, [string]$name)
Add-Type -AssemblyName System.Drawing
$S = $env:TEMP  # previzualizarea merge în %TEMP%prev
$out = 'D:\Proiecte Claude\Prime Supplements\Prime-supplements\primesupplements.ro-audit\pagina-produs-vizuala\poze\jpg'
$img = [System.Drawing.Image]::FromFile($src)
$ch = $img.Height; $cw = [int]($ch * 0.8)
$x = [int]([math]::Max(0, [math]::Min($img.Width - $cw, $img.Width * $cx - $cw / 2)))
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
foreach ($t in @(@(1600, 2000, "$out\$name.jpg", 88), @(400, 500, "$S\prev\$name.jpg", 80))) {
  $b = New-Object System.Drawing.Bitmap $t[0], $t[1]; $g = [System.Drawing.Graphics]::FromImage($b)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $t[0], $t[1]), (New-Object System.Drawing.Rectangle $x, 0, $cw, $ch), [System.Drawing.GraphicsUnit]::Pixel)
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$t[3])
  $b.Save($t[2], $codec, $ep); $g.Dispose(); $b.Dispose()
}
$img.Dispose()
"$name.jpg x=$x w=$cw $([int]((Get-Item "$out\$name.jpg").Length/1024)) KB"
