# Pinuri Pinterest 1000x1500 din pozele articolelor de blog (lista.json din build-lista.mjs). .NET System.Drawing.
# Rulare: powershell -ExecutionPolicy Bypass -File make-pins.ps1 -Src <folder poze> -Out <folder pinuri> [-Only handle]
param([string]$Src, [string]$Out, [string]$Only = '')
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$LOGO = [System.Drawing.Image]::FromFile((Join-Path $ROOT '..\..\afiliati\tools\logo-white.png'))
$RED  = [System.Drawing.Color]::FromArgb(236,30,36)
$PX   = [System.Drawing.GraphicsUnit]::Pixel
$W=1000; $H=1500
$SF = [System.Drawing.StringFormat]::GenericTypographic
function Fnt($name,$size){ New-Object System.Drawing.Font($name,[single]$size,[System.Drawing.FontStyle]::Regular,$PX) }
function Wd($g,$t,$f){ $g.MeasureString($t,$f,100000,$SF).Width }
function Lines($g,$t,$f,$maxw){ $out=@(); $line=''; foreach($w in $t.Split(' ')){ $try = if($line){"$line $w"}else{$w}; if((Wd $g $try $f) -gt $maxw -and $line){ $out+=$line; $line=$w } else { $line=$try } }; if($line){ $out+=$line }; ,$out }
function SaveJpg($bmp,$path){
  $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]86)
  $bmp.Save($path,$codec,$ep)
}
$list = Get-Content (Join-Path $ROOT 'pinuri-articole\lista.json') -Raw -Encoding UTF8 | ConvertFrom-Json
New-Item -ItemType Directory -Force $Out | Out-Null
$n=0
foreach($a in $list){
  if($Only -and $a.handle -ne $Only){ continue }
  $p = Join-Path $Src ($a.handle + '.jpg'); if(-not (Test-Path $p)){ Write-Host "lipsa poza: $($a.handle)"; continue }
  $img=New-Object System.Drawing.Bitmap($p); $img.SetResolution(96,96)
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode='AntiAlias'; $g.InterpolationMode='HighQualityBicubic'; $g.TextRenderingHint='AntiAlias'; $g.PixelOffsetMode='HighQuality'
  $g.Clear([System.Drawing.Color]::Black)
  # poza sus: 1000x960, crop centrat (cover)
  $ph=960; $r=[Math]::Max([double]$W/[double]$img.Width,[double]$ph/[double]$img.Height); $sw=[int]($W/$r); $sh=[int]($ph/$r)
  $sx=[int](($img.Width-$sw)/2); $sy=[int](($img.Height-$sh)/2)
  $g.DrawImage($img,(New-Object System.Drawing.Rectangle(0,0,$W,$ph)),(New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)),$PX)
  $gr=New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Point(0,700)),(New-Object System.Drawing.Point(0,961)),[System.Drawing.Color]::FromArgb(0,0,0,0),[System.Drawing.Color]::FromArgb(255,0,0,0))
  $g.FillRectangle($gr,0,700,$W,261)
  # umbră sus pentru logo
  $tg=New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Point(0,0)),(New-Object System.Drawing.Point(0,200)),[System.Drawing.Color]::FromArgb(170,0,0,0),[System.Drawing.Color]::FromArgb(0,0,0,0))
  $g.FillRectangle($tg,0,0,$W,200)
  $lw=260; $lh=[int]($LOGO.Height*$lw/$LOGO.Width); $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(55,45,$lw,$lh)))
  # eticheta + titlu
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),60,905,56,6)
  $g.DrawString($a.tag,(Fnt 'Segoe UI Semibold' 30),(New-Object System.Drawing.SolidBrush($RED)),[single]130,[single]888,$SF)
  $size=86; do { $f=Fnt 'Segoe UI Black' $size; $ls=Lines $g $a.title $f ($W-120); $size-=4 } while(($ls.Count*$f.Size*1.05) -gt 420 -and $size -gt 40)
  $y=950; foreach($l in $ls){ $g.DrawString($l,$f,[System.Drawing.Brushes]::White,[single]58,[single]$y,$SF); $y+=[int]($f.Size*1.05) }
  # bara de jos
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,($H-110),$W,110)
  $g.DrawString('Citește ghidul complet  →',(Fnt 'Segoe UI Semibold' 34),[System.Drawing.Brushes]::White,[single]60,[single]($H-80),$SF)
  $t='primesupplements.ro'; $ft=Fnt 'Segoe UI Black' 34; $g.DrawString($t,$ft,[System.Drawing.Brushes]::White,[single]($W-60-(Wd $g $t $ft)),[single]($H-80),$SF)
  $g.Dispose(); $img.Dispose(); SaveJpg $bmp (Join-Path $Out ($a.handle + '.jpg')); $bmp.Dispose(); $n++
}
Write-Host "pinuri: $n"
