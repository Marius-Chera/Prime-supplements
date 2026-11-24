param([string]$Src, [string]$Out)
Add-Type -AssemblyName System.Drawing
$W = 1080; $H = 1920
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear([System.Drawing.Color]::FromArgb(17,17,17))

# poza (4:5) sus, sub titlu
$img = [System.Drawing.Image]::FromFile($Src)
$ph = [int]($W * $img.Height / $img.Width)
$top = 250
$g.DrawImage($img, 0, $top, $W, $ph)

$red = [System.Drawing.Color]::FromArgb(236,30,36)
$white = [System.Drawing.Brushes]::White
$center = New-Object System.Drawing.StringFormat; $center.Alignment = 'Center'; $center.LineAlignment = 'Center'

$f1 = New-Object System.Drawing.Font 'Segoe UI Black', 54, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$f2 = New-Object System.Drawing.Font 'Segoe UI Semibold', 34, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('CEL MAI VÂNDUT PRODUS PRIME', $f1, $white, (New-Object System.Drawing.RectangleF 0, 95, $W, 80), $center)
$g.DrawString('Crema de orez Prime Creamy Rice', $f2, (New-Object System.Drawing.SolidBrush $red), (New-Object System.Drawing.RectangleF 0, 165, $W, 60), $center)

# jos: text + loc liber pentru autocolantul Link
$by = $top + $ph
$f3 = New-Object System.Drawing.Font 'Segoe UI Semibold', 36, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Gata în câteva secunde · 22 de porții la 1 kg', $f3, $white, (New-Object System.Drawing.RectangleF 0, ($by + 20), $W, 60), $center)
$f4 = New-Object System.Drawing.Font 'Segoe UI Black', 40, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('APASĂ PE LINK ↓', $f4, (New-Object System.Drawing.SolidBrush $red), (New-Object System.Drawing.RectangleF 0, ($by + 80), $W, 60), $center)

$img.Dispose(); $g.Dispose()
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$p = New-Object System.Drawing.Imaging.EncoderParameters 1
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L
$bmp.Save($Out, $enc, $p); $bmp.Dispose()
"ok $Out"
