# Cartonașe SKU pentru producător (polybag) – Hanorac + Pantaloni ediție limitată 2026 (9.11.2026)
# .NET System.Drawing, fără Python. Rulare: powershell -File make.ps1
# Ieșire: cartonase/<SKU>.png (85 x 55 mm la 300 dpi = 1004 x 650 px) + 2 fișe rezumat + ZIP pentru e-mail.
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$OUT  = Join-Path $ROOT 'cartonase'
New-Item -ItemType Directory -Force $OUT | Out-Null
$LOGO = [System.Drawing.Image]::FromFile((Join-Path (Split-Path (Split-Path $ROOT)) 'social\logo-dark.png'))

$RED  = [System.Drawing.Color]::FromArgb(236,30,36)
$INK  = [System.Drawing.Color]::FromArgb(17,17,19)
$GREY = [System.Drawing.Color]::FromArgb(110,110,116)
$LINE = [System.Drawing.Color]::FromArgb(215,215,220)
$PX   = [System.Drawing.GraphicsUnit]::Pixel
function Fnt($name,$size,$bold=$false){ $st = if($bold){[System.Drawing.FontStyle]::Bold}else{[System.Drawing.FontStyle]::Regular}; New-Object System.Drawing.Font($name,[single]$size,$st,$PX) }
function W($g,$t,$f){ $g.MeasureString($t,$f).Width }
function Fit($g,$t,$name,$size,$maxw,$bold=$false){ $f=Fnt $name $size $bold; while((W $g $t $f) -gt $maxw -and $size -gt 18){ $size-=2; $f=Fnt $name $size $bold }; $f }
function Txt($g,$x,$y,$t,$f,$col){ $g.DrawString($t,$f,(New-Object System.Drawing.SolidBrush($col)),[single]$x,[single]$y) }
function TxtC($g,$cx,$y,$t,$f,$col){ $w=W $g $t $f; Txt $g ($cx-$w/2) $y $t $f $col }
function NewG($bmp){ $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.TextRenderingHint='AntiAliasGridFit'; $g.InterpolationMode='HighQualityBicubic'; $g.Clear([System.Drawing.Color]::White); $g }
function Save($bmp,$path){ $bmp.SetResolution(300,300); $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose() }

$SIZES = 'S','M','L','XL','XXL','3XL','4XL'
$PRODUCTS = @(
  @{ title='Hanorac Prime'; sub='Ediție limitată 2026'; prefix='HR-HANORAC-LIMITED-2026'; file='hanorac' },
  @{ title='Pantaloni lungi bumbac Prime'; sub='Ediție limitată 2026'; prefix='PANTS-B-LIMITED-2026'; file='pantaloni' }
)

# ---------- cartonaș individual (1004 x 650) ----------
function Card($p,$size){
  $sku = "$($p.prefix)-$size"
  $Wd=1004; $Hd=650
  $bmp = New-Object System.Drawing.Bitmap($Wd,$Hd); $g = NewG $bmp
  # chenar + bandă roșie sus
  $g.DrawRectangle((New-Object System.Drawing.Pen($LINE,3)),1,1,$Wd-3,$Hd-3)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,0,$Wd,14)
  # logo
  $lw=300; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(52,48,$lw,$lh)))
  # mărimea – dreapta sus, într-o casetă neagră
  $bw=250; $bh=150; $bx=$Wd-52-$bw; $by=44
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),$bx,$by,$bw,$bh)
  Txt $g ($bx+20) ($by+14) 'MĂRIME / SIZE' (Fnt 'Bahnschrift SemiBold' 22) ([System.Drawing.Color]::FromArgb(200,200,205))
  $fs = Fit $g $size 'Bahnschrift SemiBold' 96 ($bw-40) $true
  $sw = W $g $size $fs
  Txt $g ($bx+$bw/2-$sw/2) ($by+38) $size $fs ([System.Drawing.Color]::White)
  # titlu
  $ft = Fit $g $p.title 'Segoe UI' 50 ($bx-52-40) $true
  Txt $g 48 230 $p.title $ft $INK
  Txt $g 52 300 $p.sub.ToUpper() (Fnt 'Bahnschrift SemiBold' 28) $RED
  # linie
  $g.DrawLine((New-Object System.Drawing.Pen($LINE,2)),52,360,$Wd-52,360)
  # SKU
  Txt $g 52 380 'SKU' (Fnt 'Bahnschrift SemiBold' 24) $GREY
  $fk = Fit $g $sku 'Consolas' 66 ($Wd-104) $true
  Txt $g 46 410 $sku $fk $INK
  # subsol
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),0,$Hd-70,$Wd,70)
  Txt $g 52 ($Hd-52) 'primesupplements.ro' (Fnt 'Segoe UI Semibold' 28) ([System.Drawing.Color]::White)
  $r='Hardcore Sports Nutrition'; $fr=Fnt 'Bahnschrift SemiBold' 24; Txt $g ($Wd-52-(W $g $r $fr)) ($Hd-49) $r $fr ([System.Drawing.Color]::FromArgb(200,200,205))
  Save $bmp (Join-Path $OUT "$sku.png")
  $g.Dispose()
}

# ---------- fișă rezumat per produs (1240 x 1100) ----------
function Sheet($p){
  $Wd=1240; $Hd=1150
  $bmp = New-Object System.Drawing.Bitmap($Wd,$Hd); $g = NewG $bmp
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,0,$Wd,14)
  $lw=330; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(70,60,$lw,$lh)))
  $hdr='CODURI SKU – PRODUCȚIE 2026'; $fh=Fnt 'Bahnschrift SemiBold' 30
  Txt $g ($Wd-70-(W $g $hdr $fh)) 70 $hdr $fh $GREY
  Txt $g 66 230 $p.title (Fnt 'Segoe UI' 58 $true) $INK
  Txt $g 70 310 $p.sub.ToUpper() (Fnt 'Bahnschrift SemiBold' 30) $RED
  Txt $g 70 360 "$($SIZES.Count) mărimi · un cartonaș per mărime, în polybag" (Fnt 'Segoe UI' 26) $GREY
  # tabel
  $y=420; $rowH=78; $x1=70; $x2=330; $xe=$Wd-70
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),$x1,$y,$xe-$x1,$rowH)
  Txt $g ($x1+28) ($y+20) 'MĂRIME' (Fnt 'Bahnschrift SemiBold' 28) ([System.Drawing.Color]::White)
  Txt $g ($x2+28) ($y+20) 'SKU' (Fnt 'Bahnschrift SemiBold' 28) ([System.Drawing.Color]::White)
  $y+=$rowH; $i=0
  foreach($s in $SIZES){
    if($i % 2 -eq 1){ $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245,245,247))),$x1,$y,$xe-$x1,$rowH) }
    $g.DrawLine((New-Object System.Drawing.Pen($LINE,1)),$x1,$y+$rowH,$xe,$y+$rowH)
    Txt $g ($x1+28) ($y+14) $s (Fnt 'Bahnschrift SemiBold' 40) $INK
    Txt $g ($x2+24) ($y+16) "$($p.prefix)-$s" (Fnt 'Consolas' 38 $true) $INK
    $y+=$rowH; $i++
  }
  Txt $g 70 ($Hd-60) 'primesupplements.ro · Prime Supplements' (Fnt 'Segoe UI' 24) $GREY
  Save $bmp (Join-Path $ROOT "FISA-SKU-$($p.file)-2026.png")
  $g.Dispose()
}

foreach($p in $PRODUCTS){ foreach($s in $SIZES){ Card $p $s }; Sheet $p }
$LOGO.Dispose()

# ZIP pentru e-mail (cartonașe + fișe)
$zip = Join-Path $ROOT 'SKU-cartonase-editie-limitata-2026.zip'
if(Test-Path $zip){ Remove-Item $zip }
$tmp = Join-Path $env:TEMP ('skuzip-'+[guid]::NewGuid())
New-Item -ItemType Directory $tmp | Out-Null
Copy-Item (Join-Path $OUT '*.png') $tmp
Copy-Item (Join-Path $ROOT 'FISA-SKU-*.png') $tmp
[System.IO.Compression.ZipFile]::CreateFromDirectory($tmp,$zip)
Remove-Item -Recurse -Force $tmp
Write-Host "Gata: $((Get-ChildItem $OUT -Filter *.png).Count) cartonașe, 2 fișe, ZIP $([math]::Round((Get-Item $zip).Length/1KB)) KB"
