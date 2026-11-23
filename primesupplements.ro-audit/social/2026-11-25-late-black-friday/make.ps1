# Imaginile pentru Late Black Friday 25–28.11.2026 (Instagram carusel + 3 postări Facebook), .NET System.Drawing.
# Rulare: powershell -File make.ps1
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$PHOTO = 'D:\Prime Supplements\Mihai Diaconu crema de orez\96606008-97A8-44F5-BB1A-1BAB7A9850B4.jpeg'
$LOGO = [System.Drawing.Image]::FromFile((Join-Path (Split-Path $ROOT) 'logo-dark.png'))
$BG   = [System.Drawing.Color]::FromArgb(242,242,242)
$RED  = [System.Drawing.Color]::FromArgb(236,30,36)
$INK  = [System.Drawing.Color]::FromArgb(17,17,19)
$GREY = [System.Drawing.Color]::FromArgb(110,110,116)
$PX   = [System.Drawing.GraphicsUnit]::Pixel
$W=1080; $H=1350
function Fnt($name,$size,$bold=$false){ $st = if($bold){[System.Drawing.FontStyle]::Bold}else{[System.Drawing.FontStyle]::Regular}; New-Object System.Drawing.Font($name,[single]$size,$st,$PX) }
function Wd($g,$t,$f){ $g.MeasureString($t,$f,100000,[System.Drawing.StringFormat]::GenericTypographic).Width }
function Fit($g,$t,$name,$size,$maxw){ $f=Fnt $name $size; while((Wd $g $t $f) -gt $maxw -and $size -gt 20){ $size-=3; $f=Fnt $name $size }; $f }
function Tracked($g,$x,$y,$t,$f,$col,$tr,$anchor){
  $w=0; foreach($c in $t.ToCharArray()){ $w += (Wd $g ([string]$c) $f) + $tr }; $w -= $tr
  if($anchor -eq 'r'){ $x -= $w } elseif($anchor -eq 'c'){ $x -= $w/2 }
  $b=New-Object System.Drawing.SolidBrush($col)
  foreach($c in $t.ToCharArray()){ $g.DrawString([string]$c,$f,$b,[single]$x,[single]$y,[System.Drawing.StringFormat]::GenericTypographic); $x += (Wd $g ([string]$c) $f) + $tr }
}
function Center($g,$t,$f,$col,$y){ $tw=Wd $g $t $f; $g.DrawString($t,$f,(New-Object System.Drawing.SolidBrush($col)),[single](($W-$tw)/2),[single]$y,[System.Drawing.StringFormat]::GenericTypographic) }
function SaveJpg($bmp,$path){
  $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]90)
  $bmp.Save($path,$codec,$ep)
}
function NewG($bmp){ $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.InterpolationMode='HighQualityBicubic'; $g.TextRenderingHint='AntiAlias'; $g.PixelOffsetMode='HighQuality'; $g }

# Cadrul 1: fotografie reală, gradient jos, titlu
function Photo($out){
  $img=[System.Drawing.Image]::FromFile($PHOTO)
  foreach($p in $img.PropertyItems){ if($p.Id -eq 0x0112){ $o=$p.Value[0]; if($o -eq 6){$img.RotateFlip('Rotate90FlipNone')} elseif($o -eq 8){$img.RotateFlip('Rotate270FlipNone')} elseif($o -eq 3){$img.RotateFlip('Rotate180FlipNone')} } }
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp
  $sw=$img.Width; $sh=[int]($sw*$H/$W); if($sh -gt $img.Height){ $sh=$img.Height; $sw=[int]($sh*$W/$H) }
  $sx=[int](($img.Width-$sw)/2); $sy=[int](($img.Height-$sh)*0.35)
  $g.DrawImage($img,(New-Object System.Drawing.Rectangle(0,0,$W,$H)),(New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)),$PX)
  $gr=New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Point(0,700)),(New-Object System.Drawing.Point(0,$H)),[System.Drawing.Color]::FromArgb(0,0,0,0),[System.Drawing.Color]::FromArgb(235,0,0,0))
  $g.FillRectangle($gr,0,700,$W,$H-700)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),70,960,60,6)
  Tracked $g 70 986 'LATE BLACK FRIDAY' (Fnt 'Segoe UI Semibold' 26) ([System.Drawing.Color]::White) 4 'l'
  Tracked $g 70 1022 '25–28 NOIEMBRIE' (Fnt 'Segoe UI Semibold' 26) ([System.Drawing.Color]::White) 4 'l'
  $y=1075
  foreach($ln in @(@('PENTRU CEI','w'),@('CARE NU AU','w'),@('APUCAT.','r'))){
    $f=Fit $g $ln[0] 'Segoe UI Black' 78 500
    $br = if($ln[1] -eq 'r'){ New-Object System.Drawing.SolidBrush($RED) } else { [System.Drawing.Brushes]::White }
    $g.DrawString($ln[0],$f,$br,[single]62,[single]$y,[System.Drawing.StringFormat]::GenericTypographic); $y+=[int]($f.Size*1.02)
  }
  $g.Dispose(); $img.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

# Cadrul cu codul: fundal alb-gri, cod mare roșu în chenar punctat
function Code($out,$tag,$line1,$line2){
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp; $g.Clear($BG)
  $lw=260; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle([int](($W-$lw)/2),90,$lw,$lh)))
  Tracked $g ($W/2) 250 $tag (Fnt 'Segoe UI Semibold' 28) $RED 5 'c'
  Center $g $line1 (Fit $g $line1 'Segoe UI Black' 84 ($W-140)) $INK 320
  $bx=110; $by=500; $bw=$W-220; $bh=330
  $g.FillRectangle([System.Drawing.Brushes]::White,$bx,$by,$bw,$bh)
  $pen=New-Object System.Drawing.Pen($INK,6); $pen.DashStyle='Dash'
  $g.DrawRectangle($pen,$bx,$by,$bw,$bh)
  Center $g 'COD' (Fnt 'Segoe UI Semibold' 30) $GREY ($by+40)
  Center $g 'LATEBF20' (Fit $g 'LATEBF20' 'Segoe UI Black' 150 ($bw-80)) $RED ($by+90)
  Center $g '−20 %' (Fnt 'Segoe UI Black' 120) $INK 880
  Center $g $line2 (Fnt 'Segoe UI Semibold' 40) $INK 1035
  Center $g 'la produsele din magazin (fără pachete) · o dată per client' (Fnt 'Segoe UI' 28) $GREY 1100
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,($H-110),$W,110)
  Center $g 'primesupplements.ro' (Fnt 'Segoe UI Semibold' 40) ([System.Drawing.Color]::White) ($H-82)
  $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

Photo (Join-Path $ROOT 'lbf-01-foto.jpg')
Code (Join-Path $ROOT 'lbf-02-cod.jpg') 'LATE BLACK FRIDAY' 'PENTRU CEI CARE NU AU APUCAT' '25–28 NOIEMBRIE'
Code (Join-Path $ROOT 'lbf-03-cod-pana-maine.jpg') 'LATE BLACK FRIDAY' 'MAI AI PÂNĂ MÂINE SEARĂ' 'până sâmbătă, 28.11, la 23:59'
Code (Join-Path $ROOT 'lbf-04-cod-ultima-zi.jpg') 'ULTIMA ZI' 'AZI E ULTIMA ZI' 'până azi, 28.11, la 23:59'
