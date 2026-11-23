# Coduri EAN-13 interne – Collagen shot (23.11.2026). Bloc intern 4002026 5000x (vezi memoria prime-sku-equals-ean).
# Funcțiile EAN/PNG/SVG sunt copiate din ../sku-editie-limitata-2026/make.ps1. Rulare: powershell -File make.ps1
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$OUT  = Join-Path $ROOT 'Prime-Health-Shoturi-EAN'
if(Test-Path $OUT){ Remove-Item -Recurse -Force $OUT }
New-Item -ItemType Directory -Force (Join-Path $OUT 'barcodes-png') | Out-Null
New-Item -ItemType Directory -Force (Join-Path $OUT 'barcodes-svg') | Out-Null
$CHROME = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
# ---------- EAN-13 ----------
# Atenție: numele variabilelor PowerShell nu țin cont de majuscule – tabelele au prefixul EAN_ ca să nu fie
# acoperite de variabilele locale $g / $r din funcții.
function EanCheck([string]$d12){ $s=0; for($i=0;$i -lt 12;$i++){ $v=[int][string]$d12[$i]; $s += if($i % 2 -eq 0){$v}else{3*$v} }; return (10 - ($s % 10)) % 10 }
function EanFull([string]$d12){ return $d12 + (EanCheck $d12) }
$EAN_L = '0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'
$EAN_G = '0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'
$EAN_R = '1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'
$EAN_PAR = 'LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'
function EanModules([string]$d13){
  $first=[int][string]$d13[0]; $p=$EAN_PAR[$first]; $m='101'
  for($i=1;$i -le 6;$i++){ $v=[int][string]$d13[$i]; $m += if($p[$i-1] -eq 'L'){$EAN_L[$v]}else{$EAN_G[$v]} }
  $m+='01010'
  for($i=7;$i -le 12;$i++){ $v=[int][string]$d13[$i]; $m += $EAN_R[$v] }
  $m+='101'
  if($m.Length -ne 95){ throw "EAN ${d13}: $($m.Length) module în loc de 95" }
  return $m
}
$GUARD = @(0,1,2,45,46,47,48,49,92,93,94)

# PNG: modul 6 px la 300 dpi (0,508 mm ≈ 154 % din mărimea nominală; producătorul îl poate micșora până la 80 %),
# zonă liberă 11 module stânga / 7 dreapta, cifre dedesubt. Fundal alb, fără alte elemente.
function BarcodePng($ean,$path){
  $mw=6; $h=340; $ql=11; $qr=7; $Wd=($ql+95+$qr)*$mw; $Hd=$h+22+70+30
  $bmp = New-Object System.Drawing.Bitmap($Wd,$Hd); $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode='None'; $g.TextRenderingHint='AntiAliasGridFit'; $g.Clear([System.Drawing.Color]::White)
  $m = EanModules $ean; $b=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black); $x0=$ql*$mw; $y0=20
  for($i=0;$i -lt 95;$i++){ if($m[$i] -eq '1'){ $hh = if($GUARD -contains $i){$h+22}else{$h}; $g.FillRectangle($b,$x0+$i*$mw,$y0,$mw,$hh) } }
  $f = New-Object System.Drawing.Font('Consolas',[single]46,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $ty=$y0+$h+4
  $g.DrawString([string]$ean[0],$f,$b,[single]($x0-(3.5*$mw)-$g.MeasureString('0',$f).Width/2),[single]$ty)
  $g1=$ean.Substring(1,6); $g2=$ean.Substring(7,6)
  $w1=$g.MeasureString($g1,$f).Width; $g.DrawString($g1,$f,$b,[single]($x0+3*$mw+(42*$mw-$w1)/2),[single]$ty)
  $w2=$g.MeasureString($g2,$f).Width; $g.DrawString($g2,$f,$b,[single]($x0+50*$mw+(42*$mw-$w2)/2),[single]$ty)
  $bmp.SetResolution(300,300); $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}
# SVG vectorial la mărimea nominală GS1 (modul 0,33 mm; 37,29 x 25,93 mm cu zonele libere)
function BarcodeSvg($ean,$path){
  $mw=0.33; $ql=11; $qr=7; $h=22.85; $W=[math]::Round(($ql+95+$qr)*$mw,2); $H=25.93
  $m = EanModules $ean; $sb = New-Object System.Text.StringBuilder
  [void]$sb.Append("<svg xmlns=""http://www.w3.org/2000/svg"" width=""${W}mm"" height=""${H}mm"" viewBox=""0 0 $W $H""><rect width=""$W"" height=""$H"" fill=""#fff""/>")
  $x0=$ql*$mw
  for($i=0;$i -lt 95;$i++){ if($m[$i] -eq '1'){ $hh = if($GUARD -contains $i){$h+1.65}else{$h}; $x=[math]::Round($x0+$i*$mw,3); [void]$sb.Append("<rect x=""$x"" y=""0"" width=""$mw"" height=""$hh"" fill=""#000""/>") } }
  $fs=2.75; $ty=$H-0.3
  [void]$sb.Append("<g font-family=""OCR-B, Consolas, monospace"" font-size=""$fs"" fill=""#000"" text-anchor=""middle"">")
  [void]$sb.Append("<text x=""$([math]::Round($x0-3.5*$mw,3))"" y=""$ty"">$($ean[0])</text>")
  [void]$sb.Append("<text x=""$([math]::Round($x0+24*$mw,3))"" y=""$ty"" textLength=""$([math]::Round(38*$mw,3))"" lengthAdjust=""spacingAndGlyphs"">$($ean.Substring(1,6))</text>")
  [void]$sb.Append("<text x=""$([math]::Round($x0+71*$mw,3))"" y=""$ty"" textLength=""$([math]::Round(38*$mw,3))"" lengthAdjust=""spacingAndGlyphs"">$($ean.Substring(7,6))</text>")
  [void]$sb.Append('</g></svg>')
  [IO.File]::WriteAllText($path,$sb.ToString(),(New-Object System.Text.UTF8Encoding $false))
}

# 23.11 (v2): ambele shot-uri, fiecare cu cod pentru flaconul individual și pentru cutia de 20. Codurile Collagen din v1 rămân aceleași.
$CODES = @(
  [pscustomobject]@{ key='COLLAGEN-SHOT-FLACON';  ro='Colagen bovin 12 000 mg + Glucozamină – shot 25 ml (flacon individual)'; use='Pe eticheta fiecărui flacon'; ean13=(EanFull '400202650001') },
  [pscustomobject]@{ key='COLLAGEN-SHOT-CUTIE';   ro='Colagen bovin 12 000 mg + Glucozamină – cutie 20 × 25 ml'; use='Pe cutia în care stau cele 20 de flacoane'; ean13=(EanFull '400202650002') },
  [pscustomobject]@{ key='MAGNEZIU-SHOT-FLACON';  ro='Magneziu bisglicinat – shot 25 ml (flacon individual)'; use='Pe eticheta fiecărui flacon'; ean13=(EanFull '400202650003') },
  [pscustomobject]@{ key='MAGNEZIU-SHOT-CUTIE';   ro='Magneziu bisglicinat – cutie 20 × 25 ml'; use='Pe cutia în care stau cele 20 de flacoane'; ean13=(EanFull '400202650004') }
)
foreach($c in $CODES){
  $c | Add-Member png "barcodes-png/$($c.key)-$($c.ean13).png"; $c | Add-Member svg "barcodes-svg/$($c.key)-$($c.ean13).svg"
  BarcodePng $c.ean13 (Join-Path $OUT $c.png); BarcodeSvg $c.ean13 (Join-Path $OUT $c.svg)
}
$CODES | Select-Object key,ro,ean13 | Export-Csv -NoTypeInformation -Encoding UTF8 (Join-Path $OUT 'ean-codes.csv')

function Esc($s){ [System.Net.WebUtility]::HtmlEncode($s) }
$rows = ''
foreach($c in $CODES){
  $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $OUT $c.png)))
  $rows += "<tr><td><div class='t'>$(Esc $c.ro)</div><div class='small'>$(Esc $c.use)</div></td><td class='ean'>$($c.ean13)</td><td class='bc'><img src='data:image/png;base64,$b64' alt='$($c.ean13)'></td></tr>"
}
$html = @"
<!doctype html><html lang="ro"><head><meta charset="utf-8"><title>Prime Health shot-uri – coduri EAN-13</title>
<style>
@page { size: A4; margin: 16mm; }
body { font-family: Arial, Helvetica, sans-serif; color:#111; font-size: 11pt; line-height: 1.45; margin:0; }
h1 { font-size: 20pt; margin: 0 0 1mm; } h2 { font-size: 14pt; margin: 8mm 0 2mm; border-bottom: 2px solid #ec1e24; padding-bottom: 1.5mm; }
.sub { color:#666; margin:0 0 6mm; } table { border-collapse: collapse; width: 100%; } tr { page-break-inside: avoid; }
th, td { border: 1px solid #ccc; padding: 3mm; vertical-align: middle; text-align:left; } th { background:#111; color:#fff; font-size: 10pt; }
td.ean { font-family: Consolas, 'Courier New', monospace; font-size: 15pt; font-weight: bold; white-space: nowrap; } td.bc img { width: 52mm; display:block; }
.t { font-weight: bold; } .small { font-size: 9.5pt; color:#555; } ul { margin: 0; padding-left: 5mm; } li { margin: 0 0 1.2mm; }
</style></head><body>
<h1>Prime Health – shot-uri Collagen și Magneziu</h1>
<p class="sub">Coduri EAN-13: fiecare flacon individual și cutia de 20 de flacoane · Prime Sport Supplements S.R.L. · 23.11.2026</p>
<table><tr><th>Produs / ambalaj</th><th>EAN-13 (= SKU)</th><th>Cod de bare</th></tr>$rows</table>
<h2>Cerințe de tipar pentru codul de bare</h2>
<ul>
<li>Negru pe alb (sau pe fond foarte deschis, mat). Fără culori, fără tipar negativ (alb pe închis), fără lac lucios peste cod.</li>
<li>Se folosesc fișierele livrate (SVG vectorial la 100 %, 37,29 × 25,93 mm cu zonele albe; PNG la 300 dpi). Codul nu se redesenează.</li>
<li>Mărime: între 80 % și 100 % din cea nominală (la 80 %: barele au minimum 29,8 mm lățime și 18,3 mm înălțime). Nu se trunchiază pe înălțime.</li>
<li>Zonele albe din stânga și din dreapta barelor rămân libere (minimum 3,6 mm stânga și 2,3 mm dreapta la 100 %).</li>
<li>Pe flaconul rotund (Ø 20,8 mm), codul se pune cu barele verticale (perpendicular pe axa flaconului), ca să se poată scana.</li>
<li>Cele 13 cifre rămân lizibile sub bare.</li>
</ul>
<p class="small">Fișierele sursă: folderele barcodes-svg și barcodes-png, plus ean-codes.csv.</p>
</body></html>
"@
$htmlPath = Join-Path $OUT 'Prime-Health-Shoturi-EAN.html'
[IO.File]::WriteAllText($htmlPath,$html,(New-Object System.Text.UTF8Encoding $false))
$pdfPath = Join-Path $OUT 'Prime-Health-Shoturi-EAN.pdf'
& $CHROME --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdfPath" "file:///$($htmlPath.Replace([char]92,[char]47))" 2>$null | Out-Null
Start-Sleep -Seconds 2
if(-not (Test-Path $pdfPath)){ throw 'PDF-ul nu a fost generat' }
Remove-Item $htmlPath
$CODES | Select-Object key,ean13 | Format-Table -AutoSize | Out-String | Write-Host
Write-Host "PDF $([math]::Round((Get-Item $pdfPath).Length/1KB)) KB"
