# Cartonașe EAN pentru producător (polybag) – Hanorac + Pantaloni ediție limitată 2026 (9.11.2026)
# Codul EAN-13 ține loc și de SKU (regula proprietarului). Prefix GS1 al firmei: 6421766; referințele 06441–06454
# continuă după ultimul cod folosit în magazin (6421766064404, Creapure 300 g).
# .NET System.Drawing, fără Python. Rulare: powershell -File make.ps1
# Ieșire: cartonase/<PRODUS>-<MĂRIME>-<EAN>.png (85 x 55 mm la 300 dpi = 1004 x 650 px), 2 fișe rezumat, ZIP, coduri.csv
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$OUT  = Join-Path $ROOT 'cartonase'
if(Test-Path $OUT){ Remove-Item -Recurse -Force $OUT }
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
function NewG($bmp){ $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.TextRenderingHint='AntiAliasGridFit'; $g.InterpolationMode='HighQualityBicubic'; $g.Clear([System.Drawing.Color]::White); $g }
function Save($bmp,$path){ $bmp.SetResolution(300,300); $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose() }

# ---------- EAN-13 ----------
function EanCheck([string]$d12){ $s=0; for($i=0;$i -lt 12;$i++){ $v=[int][string]$d12[$i]; $s += if($i % 2 -eq 0){$v}else{3*$v} }; return (10 - ($s % 10)) % 10 }
function EanFull([string]$d12){ return $d12 + (EanCheck $d12) }
# Atenție: numele variabilelor PowerShell nu țin cont de majuscule – tabelele au prefixul EAN_ ca să nu fie
# acoperite de variabilele locale $g (grafica) și $r (rândul) din funcțiile care le folosesc.
$EAN_L = '0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'
$EAN_G = '0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'
$EAN_R = '1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'
$EAN_PAR = 'LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'
function EanModules([string]$d13){
  $first=[int][string]$d13[0]; $p=$EAN_PAR[$first]; $m='101'
  for($i=1;$i -le 6;$i++){ $v=[int][string]$d13[$i]; $m += if($p[$i-1] -eq 'L'){$EAN_L[$v]}else{$EAN_G[$v]} }
  $m+='01010'
  for($i=7;$i -le 12;$i++){ $v=[int][string]$d13[$i]; $m += $EAN_R[$v] }
  $m+='101'   # 95 module
  if($m.Length -ne 95){ throw "EAN ${d13}: $($m.Length) module în loc de 95" }
  return $m
}
# desenează codul cu colțul stânga-sus la ($x,$y); $mw = lățimea unui modul în px; $h = înălțimea barelor
function DrawEan($g,$x,$y,$d13,$mw,$h){
  $m = EanModules $d13; $b=New-Object System.Drawing.SolidBrush($INK)
  $guard = @(0,1,2,45,46,47,48,49,92,93,94)
  for($i=0;$i -lt 95;$i++){
    if($m[$i] -eq '1'){ $hh = if($guard -contains $i){$h+22}else{$h}; $g.FillRectangle($b,[int]($x+$i*$mw),[int]$y,[int]$mw,[int]$hh) }
  }
  # cifrele: prima în stânga, 6 sub jumătatea stângă, 6 sub jumătatea dreaptă
  $fd = Fnt 'Consolas' ([int](7.2*$mw)) $true; $ty = $y+$h+2
  Txt $g ($x-(W $g 'X' $fd)-2) $ty ([string]$d13[0]) $fd $INK
  $g1=$d13.Substring(1,6); $g2=$d13.Substring(7,6)
  $w1=W $g $g1 $fd; Txt $g ($x+3*$mw+(42*$mw-$w1)/2) $ty $g1 $fd $INK
  $w2=W $g $g2 $fd; Txt $g ($x+50*$mw+(42*$mw-$w2)/2) $ty $g2 $fd $INK
}

$SIZES = 'S','M','L','XL','XXL','3XL','4XL'
$PREFIX = '64217660'          # 6421766 + 0 (referințele 06441–06454)
$PRODUCTS = @(
  @{ title='Hanorac Prime'; sub='Ediție limitată 2026'; file='HANORAC'; start=6441 },
  @{ title='Pantaloni lungi bumbac Prime'; sub='Ediție limitată 2026'; file='PANTALONI'; start=6448 }
)
$CODES = @()
foreach($p in $PRODUCTS){ $i=0; foreach($s in $SIZES){ $CODES += [pscustomobject]@{ produs=$p.title; file=$p.file; marime=$s; ean=(EanFull ($PREFIX + ($p.start+$i).ToString('0000'))) }; $i++ } }
$CODES | Export-Csv -NoTypeInformation -Encoding UTF8 (Join-Path $ROOT 'coduri-ean.csv')

# ---------- cartonaș individual (1004 x 650) ----------
function Card($p,$size,$ean){
  $Wd=1004; $Hd=650
  $bmp = New-Object System.Drawing.Bitmap($Wd,$Hd); $g = NewG $bmp
  $g.DrawRectangle((New-Object System.Drawing.Pen($LINE,3)),1,1,$Wd-3,$Hd-3)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,0,$Wd,14)
  $lw=260; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(48,40,$lw,$lh)))
  # titlu sub logo
  $ft = Fit $g $p.title 'Segoe UI' 40 (560) $true
  Txt $g 44 128 $p.title $ft $INK
  Txt $g 48 184 $p.sub.ToUpper() (Fnt 'Bahnschrift SemiBold' 26) $RED
  # mărimea – casetă neagră dreapta sus
  $bw=250; $bh=150; $bx=$Wd-48-$bw; $by=40
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),$bx,$by,$bw,$bh)
  Txt $g ($bx+20) ($by+14) 'MĂRIME / SIZE' (Fnt 'Bahnschrift SemiBold' 22) ([System.Drawing.Color]::FromArgb(200,200,205))
  $fs = Fit $g $size 'Bahnschrift SemiBold' 96 ($bw-40) $true
  $sw = W $g $size $fs
  Txt $g ($bx+$bw/2-$sw/2) ($by+38) $size $fs ([System.Drawing.Color]::White)
  # linie + cod de bare EAN-13 (modul 4 px = 0,34 mm la 300 dpi, mărime ~103 %)
  $g.DrawLine((New-Object System.Drawing.Pen($LINE,2)),48,232,$Wd-48,232)
  Txt $g 48 244 'EAN-13 (= SKU)' (Fnt 'Bahnschrift SemiBold' 22) $GREY
  $mw=4; $bx0=[int](($Wd-95*$mw)/2)
  DrawEan $g $bx0 282 $ean $mw 230
  # subsol
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),0,$Hd-56,$Wd,56)
  Txt $g 48 ($Hd-45) 'primesupplements.ro' (Fnt 'Segoe UI Semibold' 26) ([System.Drawing.Color]::White)
  $r="$($p.file) · $size · $ean"; $fr=Fnt 'Consolas' 22 $true; Txt $g ($Wd-48-(W $g $r $fr)) ($Hd-43) $r $fr ([System.Drawing.Color]::FromArgb(200,200,205))
  Save $bmp (Join-Path $OUT "$($p.file)-$size-$ean.png")
  $g.Dispose()
}

# ---------- fișă rezumat per produs ----------
function Sheet($p){
  $rows = $CODES | Where-Object { $_.file -eq $p.file }
  $Wd=1240; $Hd=1260
  $bmp = New-Object System.Drawing.Bitmap($Wd,$Hd); $g = NewG $bmp
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,0,$Wd,14)
  $lw=330; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(70,60,$lw,$lh)))
  $hdr='CODURI EAN – PRODUCȚIE 2026'; $fh=Fnt 'Bahnschrift SemiBold' 30
  Txt $g ($Wd-70-(W $g $hdr $fh)) 70 $hdr $fh $GREY
  Txt $g 66 230 $p.title (Fnt 'Segoe UI' 58 $true) $INK
  Txt $g 70 310 $p.sub.ToUpper() (Fnt 'Bahnschrift SemiBold' 30) $RED
  Txt $g 70 360 "$($SIZES.Count) mărimi · un cartonaș cu cod de bare per mărime, în polybag" (Fnt 'Segoe UI' 26) $GREY
  $y=420; $rowH=96; $x1=70; $x2=330; $x3=760; $xe=$Wd-70
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($INK)),$x1,$y,$xe-$x1,78)
  Txt $g ($x1+28) ($y+20) 'MĂRIME' (Fnt 'Bahnschrift SemiBold' 28) ([System.Drawing.Color]::White)
  Txt $g ($x2+28) ($y+20) 'COD EAN-13 (= SKU)' (Fnt 'Bahnschrift SemiBold' 28) ([System.Drawing.Color]::White)
  Txt $g ($x3+28) ($y+20) 'COD DE BARE' (Fnt 'Bahnschrift SemiBold' 28) ([System.Drawing.Color]::White)
  $y+=78; $i=0
  foreach($r in $rows){
    if($i % 2 -eq 1){ $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245,245,247))),$x1,$y,$xe-$x1,$rowH) }
    $g.DrawLine((New-Object System.Drawing.Pen($LINE,1)),$x1,$y+$rowH,$xe,$y+$rowH)
    Txt $g ($x1+28) ($y+22) $r.marime (Fnt 'Bahnschrift SemiBold' 40) $INK
    Txt $g ($x2+24) ($y+26) $r.ean (Fnt 'Consolas' 38 $true) $INK
    # cod de bare mic (modul 2 px), fără cifre
    $m = EanModules $r.ean; $b=New-Object System.Drawing.SolidBrush($INK); $bx=$x3+28
    for($k=0;$k -lt 95;$k++){ if($m[$k] -eq '1'){ $g.FillRectangle($b,$bx+$k*2,$y+14,2,68) } }
    $y+=$rowH; $i++
  }
  Txt $g 70 ($Hd-60) 'primesupplements.ro · Prime Supplements · prefix GS1 6421766' (Fnt 'Segoe UI' 24) $GREY
  Save $bmp (Join-Path $ROOT "FISA-EAN-$($p.file.ToLower())-2026.png")
  $g.Dispose()
}

foreach($p in $PRODUCTS){ foreach($r in ($CODES | Where-Object { $_.file -eq $p.file })){ Card $p $r.marime $r.ean }; Sheet $p }
$LOGO.Dispose()

# ZIP pentru e-mail
Get-ChildItem $ROOT -Filter 'FISA-SKU-*.png' | Remove-Item
Get-ChildItem $ROOT -Filter '*.zip' | Remove-Item
$zip = Join-Path $ROOT 'EAN-cartonase-editie-limitata-2026.zip'
$tmp = Join-Path $env:TEMP ('eanzip-'+[guid]::NewGuid())
New-Item -ItemType Directory $tmp | Out-Null
Copy-Item (Join-Path $OUT '*.png') $tmp
Copy-Item (Join-Path $ROOT 'FISA-EAN-*.png') $tmp
Copy-Item (Join-Path $ROOT 'coduri-ean.csv') $tmp
[System.IO.Compression.ZipFile]::CreateFromDirectory($tmp,$zip)
Remove-Item -Recurse -Force $tmp
$CODES | Format-Table -AutoSize | Out-String | Write-Host
Write-Host "Gata: $((Get-ChildItem $OUT -Filter *.png).Count) cartonașe, 2 fișe, ZIP $([math]::Round((Get-Item $zip).Length/1KB)) KB"
