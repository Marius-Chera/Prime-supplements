# Generează imaginile pentru postarea „D3 + K2 din nou pe stoc” (23.10.2026), cu .NET System.Drawing
# (stil alb premium, ca social_white.py; pe Windows, fără Python). Rulare: powershell -File make.ps1
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$SRC  = 'D:\Prime Supplements\Poze jpg silviu popa produse studio\JPEG\01_D3+K2_80 cabs_front.jpg'
$LOGO = [System.Drawing.Image]::FromFile((Join-Path (Split-Path $ROOT) 'logo-dark.png'))
$full = [System.Drawing.Image]::FromFile($SRC)
# decupaj flacon (fundal studio uniform 242,242,242 = fundalul compoziției, deci fără margini vizibile)
$CROP = New-Object System.Drawing.Rectangle(1150, 450, 1700, 3550)
$BG   = [System.Drawing.Color]::FromArgb(242,242,242)
$RED  = [System.Drawing.Color]::FromArgb(236,30,36)
$INK  = [System.Drawing.Color]::FromArgb(17,17,19)
$GREY = [System.Drawing.Color]::FromArgb(120,120,126)
$LGREY= [System.Drawing.Color]::FromArgb(150,150,155)
$PX   = [System.Drawing.GraphicsUnit]::Pixel
function Fnt($name,$size,$bold=$false){ $st = if($bold){[System.Drawing.FontStyle]::Bold}else{[System.Drawing.FontStyle]::Regular}; New-Object System.Drawing.Font($name,[single]$size,$st,$PX) }
function W($g,$t,$f){ $g.MeasureString($t,$f).Width }
function Fit($g,$t,$name,$size,$maxw){ $f=Fnt $name $size; while((W $g $t $f) -gt $maxw -and $size -gt 20){ $size-=3; $f=Fnt $name $size }; $f }
function Tracked($g,$x,$y,$t,$f,$col,$tr,$anchor){
  $w=0; foreach($c in $t.ToCharArray()){ $w += (W $g ([string]$c) $f) + $tr }; $w -= $tr
  if($anchor -eq 'r'){ $x -= $w }
  $b=New-Object System.Drawing.SolidBrush($col)
  foreach($c in $t.ToCharArray()){ $g.DrawString([string]$c,$f,$b,[single]$x,[single]$y); $x += (W $g ([string]$c) $f) + $tr }
}
function RoundRect($g,$x,$y,$w,$h,$r,$col){
  $p=New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x,$y,2*$r,2*$r,180,90); $p.AddArc($x+$w-2*$r,$y,2*$r,2*$r,270,90)
  $p.AddArc($x+$w-2*$r,$y+$h-2*$r,2*$r,2*$r,0,90); $p.AddArc($x,$y+$h-2*$r,2*$r,2*$r,90,90); $p.CloseFigure()
  $g.FillPath((New-Object System.Drawing.SolidBrush($col)),$p)
}
function SaveJpg($bmp,$path){
  $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]93)
  $bmp.Save($path,$codec,$ep)
}
function Make($spec,$out,$story,$blog=$false){
  if($blog){ $W=1600; $H=900 } elseif($story){ $W=1080; $H=1920 } else { $W=1080; $H=1350 }
  $bmp=New-Object System.Drawing.Bitmap($W,$H)
  $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode='AntiAlias'; $g.InterpolationMode='HighQualityBicubic'; $g.TextRenderingHint='AntiAliasGridFit'; $g.PixelOffsetMode='HighQuality'
  $g.Clear($BG)
  # flacon
  if($blog){ $ph=800; $cy=[int]($H*0.5) } elseif($story){ $ph=620; $cy=[int]($H*0.43) } else { $ph=540; $cy=[int]($H*0.38) }
  $pw=[int]($CROP.Width*$ph/$CROP.Height)
  $g.DrawImage($full,(New-Object System.Drawing.Rectangle([int]($W/2-$pw/2),[int]($cy-$ph/2),$pw,$ph)),$CROP,$PX)
  $base=[int]($cy+$ph/2)
  if($blog){ $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose(); return }
  # logo + tag
  $top = if($story){230}else{70}
  $lw=230; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(70,$top,$lw,$lh)))
  Tracked $g ($W-70) ($top+14) $spec.tag (Fnt 'Segoe UI Semibold' 24) $RED 4 'r'
  # titlu
  $y=$base+60
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),70,$y,60,6); $y+=30
  $hs = if($story){96}else{84}
  $f1=Fit $g $spec.h1 'Segoe UI Black' $hs ($W-140); $g.DrawString($spec.h1,$f1,(New-Object System.Drawing.SolidBrush($INK)),[single]62,[single]$y); $y+=[int]($f1.Size*1.0)
  $f2=Fit $g $spec.h2 'Segoe UI Black' $hs ($W-140); $g.DrawString($spec.h2,$f2,(New-Object System.Drawing.SolidBrush($RED)),[single]62,[single]$y); $y+=[int]($f2.Size*1.3)
  $fs = if($story){32}else{30}
  $g.DrawString($spec.sub,(Fnt 'Segoe UI Semibold' $fs),(New-Object System.Drawing.SolidBrush($GREY)),[single]66,[single]$y); $y+=52
  foreach($l in $spec.claim){ $g.DrawString($l,(Fnt 'Segoe UI' 22),(New-Object System.Drawing.SolidBrush($LGREY)),[single]67,[single]$y); $y+=30 }
  # CTA
  $fc = Fnt 'Segoe UI Semibold' $(if($story){30}else{28}) $true
  $tw=W $g $spec.cta $fc
  $by = if($story){$H-300}else{$H-150}; $bh=72
  RoundRect $g 70 $by ($tw+120) $bh 36 $INK
  $g.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.Color]::White,3)),92,($by+18),36,36)
  $g.FillPolygon((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)),[System.Drawing.Point[]]@((New-Object System.Drawing.Point(100,($by+50))),(New-Object System.Drawing.Point(96,($by+60))),(New-Object System.Drawing.Point(108,($by+52)))))
  $g.DrawString($spec.cta,$fc,(New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)),[single]142,[single]($by+$bh/2-(W $g 'X' $fc)*0.62))
  $fr=Fnt 'Segoe UI Semibold' 24; $rw=W $g $spec.right $fr
  $g.DrawString($spec.right,$fr,(New-Object System.Drawing.SolidBrush($GREY)),[single]($W-70-$rw),[single]($by+$bh/2-16))
  $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}
$p1=@{ tag='PRIME HEALTH'; h1='DIN NOU'; h2='PE STOC.'; sub='Vitamina D3 + K2 • 80 de capsule'; claim=@('Vitamina D contribuie la funcționarea normală a sistemului imunitar.'); cta='Vezi produsul'; right='primesupplements.ro' }
$p2=@{ tag='GHID NOU PE BLOG'; h1='VITAMINA D'; h2='ȘI IMUNITATEA.'; sub='Ce spune UE și ce scrie pe etichetă'; claim=@('Vitamina D contribuie la funcționarea normală a sistemului imunitar.','Citește ghidul complet pe blog: primesupplements.ro/blogs/news'); cta='Citește ghidul'; right='primesupplements.ro' }
Make $p1 (Join-Path $ROOT '01-d3k2-stoc-feed.jpg') $false
Make $p1 (Join-Path $ROOT '01-d3k2-stoc-story.jpg') $true
Make $p2 (Join-Path $ROOT '02-d3k2-blog-feed.jpg') $false
Make $p1 (Join-Path $ROOT 'blog-vitamina-d-imunitate-1600x900.jpg') $false $true
$full.Dispose(); $LOGO.Dispose()
Get-ChildItem $ROOT -Filter *.jpg | Select-Object Name, Length
