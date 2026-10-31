# Chera Protocol – imaginea principală: Marius în alb, pe scenă, cu cardul IFBB Pro ridicat (poza 113, Romania Muscle Fest Pro-Am 2023).
# Re-encodare fără EXIF/GPS, sub 480 KB. Sursa e în folderul local „poze site” (neversionat).
param([string]$Repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path)
Add-Type -AssemblyName System.Drawing
$src = Join-Path $Repo 'chera-coaching\poze site\image00113.jpeg'
$out = Join-Path $Repo 'chera-coaching\upload-shopify-files\chera-hero-scena-card-pro.jpg'
$img = [System.Drawing.Image]::FromFile($src)
if ($img.PropertyIdList -contains 0x112) { $o = $img.GetPropertyItem(0x112).Value[0]; switch ($o) { 3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') } } }
$bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.DrawImage($img, 0, 0, $img.Width, $img.Height); $g.Dispose()
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
foreach ($q in 88, 84, 80, 76, 72, 68, 64, 60) {
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $bmp.Save($out, $enc, $ep); $ep.Dispose()
  $kb = [int]((Get-Item $out).Length / 1024)
  if ($kb -le 480) { break }
}
"$out  $($bmp.Width)x$($bmp.Height)  $kb KB (q$q)"
$bmp.Dispose(); $img.Dispose()
