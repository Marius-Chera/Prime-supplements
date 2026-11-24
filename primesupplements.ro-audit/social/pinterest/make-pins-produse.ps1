# Pinuri Pinterest 1000x1500 pentru produse (pinuri-produse/lista.json din build-produse.mjs). .NET System.Drawing.
# Rulare: powershell -ExecutionPolicy Bypass -File make-pins-produse.ps1 -Src <folder poze> -Out <folder pinuri> [-Only handle]
param([string]$Src, [string]$Out, [string]$Only = '')
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$LOGO = [System.Drawing.Image]::FromFile((Join-Path $ROOT '..\logo-dark.png'))
$RED  = [System.Drawing.Color]::FromArgb(236,30,36)
$BG   = [System.Drawing.Color]::FromArgb(242,242,242)
$PX   = [System.Drawing.GraphicsUnit]::Pixel
$W=1000; $H=1500
$SF = [System.Drawing.StringFormat]::GenericTypographic
function Fnt($name,$size){ New-Object System.Drawing.Font($name,[single]$size,[System.Drawing.FontStyle]::Regular,$PX) }
function Wd($g,$t,$f){ $g.MeasureString($t,$f,100000,$SF).Width }
function Lines($g,$t,$f,$maxw){ $out=@(); $line=''; foreach($w in $t.Split(' ')){ $try = if($line){"$line $w"}else{$w}; if((Wd $g $try $f) -gt $maxw -and $line){ $out+=$line; $line=$w } else { $line=$try } }; if($line){ $out+=$line }; ,$out }
function SaveJpg($bmp,$path){
  $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]88)
  $bmp.Save($path,$codec,$ep)
}
$list = Get-Content (Join-Path $ROOT 'pinuri-produse\lista.json') -Raw -Encoding UTF8 | ConvertFrom-Json
New-Item -ItemType Directory -Force $Out | Out-Null
$n=0
foreach($a in $list){
  if($Only -and $a.handle -ne $Only){ continue }
  $p = Join-Path $Src ($a.handle + '.jpg'); if(-not (Test-Path $p)){ Write-Host "lipsa poza: $($a.handle)"; continue }
  $img=New-Object System.Drawing.Bitmap($p); $img.SetResolution(96,96)
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode='AntiAlias'; $g.InterpolationMode='HighQualityBicubic'; $g.TextRenderingHint='AntiAlias'; $g.PixelOffsetMode='HighQuality'
  $g.Clear($BG)
  # fundal alb sub produs (pozele sunt pe alb) + produsul întreg, centrat
  $g.FillRectangle([System.Drawing.Brushes]::White,0,0,$W,1000)
  $box=860; $r=[Math]::Min([double]$box/[double]$img.Width,[double]$box/[double]$img.Height)
  $dw=[int]($img.Width*$r); $dh=[int]($img.Height*$r)
  $g.DrawImage($img,(New-Object System.Drawing.Rectangle([int](($W-$dw)/2),[int](110+($box-$dh)/2),$dw,$dh)),(New-Object System.Drawing.Rectangle(0,0,$img.Width,$img.Height)),$PX)
  $lw=220; $lh=[int]($LOGO.Height*$lw/$LOGO.Width); $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(50,40,$lw,$lh)))
  # panou negru cu tipul și numele produsului
  $g.FillRectangle([System.Drawing.Brushes]::Black,0,1000,$W,390)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),60,1052,56,6)
  $g.DrawString($a.tag,(Fnt 'Segoe UI Semibold' 30),(New-Object System.Drawing.SolidBrush($RED)),[single]130,[single]1035,$SF)
  $size=70; do { $f=Fnt 'Segoe UI Black' $size; $ls=Lines $g $a.title $f ($W-120); $size-=4 } while(($ls.Count*$f.Size*1.08) -gt 270 -and $size -gt 34)
  $y=1095; foreach($l in $ls){ $g.DrawString($l,$f,[System.Drawing.Brushes]::White,[single]58,[single]$y,$SF); $y+=[int]($f.Size*1.08) }
  # bara de jos
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,($H-110),$W,110)
  $g.DrawString('Vezi produsul  →',(Fnt 'Segoe UI Semibold' 34),[System.Drawing.Brushes]::White,[single]60,[single]($H-80),$SF)
  $t='primesupplements.ro'; $ft=Fnt 'Segoe UI Black' 34; $g.DrawString($t,$ft,[System.Drawing.Brushes]::White,[single]($W-60-(Wd $g $t $ft)),[single]($H-80),$SF)
  $g.Dispose(); $img.Dispose(); SaveJpg $bmp (Join-Path $Out ($a.file)); $bmp.Dispose(); $n++
}
Write-Host "pinuri: $n"
