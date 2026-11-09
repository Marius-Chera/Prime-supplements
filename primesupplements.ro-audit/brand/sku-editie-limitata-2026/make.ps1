# Date pentru producător – Hanorac + Pantaloni ediție limitată 2026 (9.11.2026, versiunea 3)
# Cerința proprietarului: FĂRĂ design de cartonaș (îl face producătorul). Livrăm doar: titlul produsului (în română),
# codul EAN-13 (= SKU) și codul de bare pentru fiecare mărime. Documentele pentru producător sunt în engleză.
# Codurile: sistemul intern folosit deja la hainele Prime (EAN-13 care încep cu 400, vezi „Coduri SKU si EAN .xls”),
# bloc dedicat 4002026 1000x (hanorac) / 4002026 2000x (pantaloni) + cifra de control GS1.
# .NET System.Drawing + Chrome headless pentru PDF. Rulare: powershell -File make.ps1
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$OUT  = Join-Path $ROOT 'Prime-Limited-Edition-2026-labels'
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

# ---------- produse ----------
$SIZES = 'S','M','L','XL','XXL','3XL','4XL'
$PRODUCTS = @(
  @{ key='HOODIE'; en='Hoodie – Limited Edition 2026'; ro='Hanorac Prime Ediție Limitată 2026'; base='40020261000' },
  @{ key='PANTS';  en='Cotton sweatpants – Limited Edition 2026'; ro='Pantaloni Prime din bumbac Ediție Limitată 2026'; base='40020262000' }
)
$CODES = @()
foreach($p in $PRODUCTS){ $i=1; foreach($s in $SIZES){ $CODES += [pscustomobject]@{ product=$p.key; product_title_ro=$p.ro; size=$s; ean13=(EanFull ($p.base + $i)); barcode_png="barcodes-png/$($p.key)-$s-$(EanFull ($p.base + $i)).png"; barcode_svg="barcodes-svg/$($p.key)-$s-$(EanFull ($p.base + $i)).svg" }; $i++ } }
$CODES | Export-Csv -NoTypeInformation -Encoding UTF8 (Join-Path $OUT 'ean-codes.csv')
foreach($c in $CODES){ BarcodePng $c.ean13 (Join-Path $OUT $c.barcode_png); BarcodeSvg $c.ean13 (Join-Path $OUT $c.barcode_svg) }

# ---------- documentul în engleză (HTML -> PDF cu Chrome headless) ----------
function Esc($s){ [System.Net.WebUtility]::HtmlEncode($s) }
$html = New-Object System.Text.StringBuilder
[void]$html.Append(@"
<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Prime Supplements – Limited Edition 2026 – Label data</title>
<style>
@page { size: A4; margin: 16mm 16mm 18mm 16mm; }
body { font-family: Arial, Helvetica, sans-serif; color:#111; font-size: 11pt; line-height: 1.45; margin:0; }
h1 { font-size: 20pt; margin: 0 0 2mm; } h2 { font-size: 15pt; margin: 8mm 0 2mm; border-bottom: 2px solid #ec1e24; padding-bottom: 1.5mm; }
.sub { color:#666; margin:0 0 6mm; } .box { background:#f5f5f7; border-left: 4px solid #ec1e24; padding: 3mm 4mm; margin: 4mm 0 6mm; }
.title-ro { font-size: 14pt; font-weight: bold; background:#111; color:#fff; padding: 3mm 4mm; display:inline-block; margin: 1mm 0 3mm; }
table { border-collapse: collapse; width: 100%; } tr { page-break-inside: avoid; } th, td { border: 1px solid #ccc; padding: 1.5mm 3mm; vertical-align: middle; text-align:left; }
th { background:#111; color:#fff; font-size: 10pt; letter-spacing: .03em; } td.size { font-size: 16pt; font-weight: bold; width: 16mm; }
td.ean { font-family: Consolas, 'Courier New', monospace; font-size: 14pt; font-weight: bold; width: 46mm; } td.bc { display:flex; align-items:center; gap: 4mm; border-left:none; } td.bc img { height: 12mm; display:block; }
ul { margin: 0; padding-left: 5mm; } li { margin: 0 0 1.2mm; } .small { font-size: 9.5pt; color:#555; } .pb { page-break-before: always; }
</style></head><body>
<h1>Prime Supplements – Limited Edition 2026</h1>
<p class="sub">Label / hang-tag data for production · issued 9 November 2026 · primesupplements.ro</p>
<div class="box"><strong>What we need from you.</strong> One card per garment, placed inside the polybag, with the following three elements and nothing else that is mandatory:
<ul><li><strong>Product title</strong> – exactly as written below, in Romanian (keep the diacritics ț, ă, ș).</li>
<li><strong>Size</strong> – S, M, L, XL, XXL, 3XL or 4XL.</li>
<li><strong>EAN-13 barcode</strong> with its 13 digits printed underneath – one code per size, see the tables.</li></ul>
<p style="margin:3mm 0 0">The card design (layout, colours, material, logo placement) is yours to create. The barcode files are supplied in this package in two formats: <strong>PNG at 300 dpi</strong> (folder <em>barcodes-png</em>) and <strong>SVG vector</strong> (folder <em>barcodes-svg</em>). The same data is in <em>ean-codes.csv</em>.</p></div>
"@)
foreach($p in $PRODUCTS){
  $rows = $CODES | Where-Object { $_.product -eq $p.key }
  if($p.key -eq 'PANTS'){ [void]$html.Append('<div class="pb"></div>') }   # pagina 2 începe cu pantalonii
  [void]$html.Append("<h2>$(Esc $p.en)</h2><p style='margin:0'>Product title to print on the card (Romanian):</p><div class='title-ro'>$(Esc $p.ro)</div>")
  [void]$html.Append('<table><tr><th>Size</th><th>EAN-13 (also used as SKU)</th><th>Barcode (file name = PRODUCT-SIZE-EAN)</th></tr>')
  foreach($r in $rows){
    $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $OUT $r.barcode_png)))
    [void]$html.Append("<tr><td class='size'>$($r.size)</td><td class='ean'>$($r.ean13)</td><td class='bc'><img src='data:image/png;base64,$b64' alt='$($r.ean13)'><span class='small'>$(Split-Path $r.barcode_png -Leaf)</span></td></tr>")
  }
  [void]$html.Append('</table>')
}
[void]$html.Append(@"
<h2>Barcode printing requirements</h2>
<ul>
<li>Print the barcode <strong>black on white</strong> (or on a very light matte background). No colours, no reversed (white-on-dark) printing, no gloss over the code.</li>
<li>Do not redraw or re-type the codes; use the supplied files. If you need to resize, scale proportionally – never stretch only one direction.</li>
<li>Minimum size: <strong>80 % of nominal</strong> (bars area at least 29.8 mm wide, bar height at least 18.3 mm). The SVG files are at 100 % nominal size (37.29 × 25.93 mm including quiet zones).</li>
<li>Keep the <strong>quiet zones</strong> (the white space left and right of the bars) free: at least 3.6 mm on the left and 2.3 mm on the right at 100 %.</li>
<li>Keep the <strong>13 digits readable</strong> under the bars – they are the backup if the scanner fails.</li>
<li>Please send us a proof (PDF or photo) of one card per product before printing the whole run, so we can test-scan it.</li>
</ul>
<p class="small">Contact: Prime Supplements · primesupplements.ro · contact@primesupplements.ro</p>
</body></html>
"@)
$htmlPath = Join-Path $OUT 'Prime-Limited-Edition-2026-label-data.html'
[IO.File]::WriteAllText($htmlPath,$html.ToString(),(New-Object System.Text.UTF8Encoding $false))
$pdfPath = Join-Path $OUT 'Prime-Limited-Edition-2026-label-data.pdf'
& $CHROME --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdfPath" "file:///$($htmlPath -replace '\\','/')" 2>$null | Out-Null
if(-not (Test-Path $pdfPath)){ throw 'PDF-ul nu a fost generat' }
Remove-Item $htmlPath

# ---------- ZIP ----------
Get-ChildItem $ROOT -Filter '*.zip' | Remove-Item
$zip = Join-Path $ROOT 'Prime-Limited-Edition-2026-labels.zip'
[System.IO.Compression.ZipFile]::CreateFromDirectory($OUT,$zip,'Optimal',$true)
$CODES | Select-Object product,size,ean13 | Format-Table -AutoSize | Out-String | Write-Host
Write-Host "Gata: $($CODES.Count) coduri, PNG+SVG, PDF $([math]::Round((Get-Item $pdfPath).Length/1KB)) KB, ZIP $([math]::Round((Get-Item $zip).Length/1KB)) KB"
