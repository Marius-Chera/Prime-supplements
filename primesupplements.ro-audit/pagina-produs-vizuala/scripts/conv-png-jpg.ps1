# Convertește scratchpad\png\*.png -> repo poze\jpg\*.jpg (latura mare 2000 px, JPEG q85) + previzualizări mici în scratchpad\prev
Add-Type -AssemblyName System.Drawing
param([string]$S)  # folderul de lucru: png = intrare, prev = previzualizări
$out = 'D:\Proiecte Claude\Prime Supplements\Prime-supplements\primesupplements.ro-audit\pagina-produs-vizuala\poze\jpg'
New-Item -ItemType Directory -Force "$S\prev" | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
function Save($img, $w, $h, $path, $q) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h)
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $bmp.Save($path, $codec, $ep); $g.Dispose(); $bmp.Dispose()
}
Get-ChildItem "$S\png\*.png" | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $h = 2000; $w = [int][math]::Round($img.Width * 2000 / $img.Height)
  Save $img $w $h (Join-Path $out ($_.BaseName + '.jpg')) 85
  Save $img 480 ([int][math]::Round($img.Height * 480 / $img.Width)) "$S\prev\$($_.BaseName).jpg" 80
  $img.Dispose()
  $kb = [int]((Get-Item (Join-Path $out ($_.BaseName + '.jpg'))).Length / 1024)
  "$($_.BaseName).jpg ${w}x$h $kb KB"
}
