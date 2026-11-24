# Caruselele K1 (proteina, 1.12) și K2 (creatina, 21.12) din planul Instagram 25.11–1.01. .NET System.Drawing.
# Rulare: powershell -File make.ps1
Add-Type -AssemblyName System.Drawing
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
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
function Txt($g,$t,$f,$col,$x,$y){ $g.DrawString($t,$f,(New-Object System.Drawing.SolidBrush($col)),[single]$x,[single]$y,[System.Drawing.StringFormat]::GenericTypographic) }
function Center($g,$t,$f,$col,$y){ $tw=Wd $g $t $f; Txt $g $t $f $col (($W-$tw)/2) $y }
function Wrap($g,$t,$f,$col,$x,$y,$maxw,$lh){
  $line=''; foreach($w in $t.Split(' ')){ $try = if($line){"$line $w"}else{$w}; if((Wd $g $try $f) -gt $maxw){ Txt $g $line $f $col $x $y; $y+=$lh; $line=$w } else { $line=$try } }
  if($line){ Txt $g $line $f $col $x $y; $y+=$lh }; $y
}
function SaveJpg($bmp,$path){
  $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]90)
  $bmp.Save($path,$codec,$ep)
}
function NewG($bmp){ $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode='AntiAlias'; $g.InterpolationMode='HighQualityBicubic'; $g.TextRenderingHint='AntiAlias'; $g.PixelOffsetMode='HighQuality'; $g }
function Footer($g,$n,$tot){
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),0,($H-110),$W,110)
  Txt $g 'primesupplements.ro' (Fnt 'Segoe UI Semibold' 36) ([System.Drawing.Color]::White) 70 ($H-80)
  $t="$n / $tot"; $f=Fnt 'Segoe UI Semibold' 32; Txt $g $t $f ([System.Drawing.Color]::White) ($W-70-(Wd $g $t $f)) ($H-78)
}

# Copertă: poză reală din ședință, gradient jos, titlu pe 3 rânduri (ultimul roșu)
function Cover($out,$photo,$fx,$fy,$tag,$lines,$zoom=1.0){
  $img=[System.Drawing.Image]::FromFile($photo)
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp
  $sw=[int]($img.Width/$zoom); $sh=[int]($sw*$H/$W); if($sh -gt $img.Height){ $sh=$img.Height; $sw=[int]($sh*$W/$H) }
  $sx=[int][Math]::Min([Math]::Max(0,$img.Width*$fx-$sw/2),$img.Width-$sw); $sy=[int][Math]::Min([Math]::Max(0,$img.Height*$fy-$sh/2),$img.Height-$sh)
  $g.DrawImage($img,(New-Object System.Drawing.Rectangle(0,0,$W,$H)),(New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)),$PX)
  $gr=New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Point(0,650)),(New-Object System.Drawing.Point(0,$H)),[System.Drawing.Color]::FromArgb(0,0,0,0),[System.Drawing.Color]::FromArgb(240,0,0,0))
  $g.FillRectangle($gr,0,650,$W,$H-650)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),70,900,60,6)
  Tracked $g 70 926 $tag (Fnt 'Segoe UI Semibold' 28) ([System.Drawing.Color]::White) 4 'l'
  $y=975; $i=0
  foreach($ln in $lines){ $i++
    $f=Fit $g $ln 'Segoe UI Black' 92 ($W-140)
    $br = if($i -eq $lines.Count){ New-Object System.Drawing.SolidBrush($RED) } else { [System.Drawing.Brushes]::White }
    $g.DrawString($ln,$f,$br,[single]62,[single]$y,[System.Drawing.StringFormat]::GenericTypographic); $y+=[int]($f.Size*1.02)
  }
  Txt $g 'Glisează →' (Fnt 'Segoe UI Semibold' 30) ([System.Drawing.Color]::White) ($W-230) 70
  $g.Dispose(); $img.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

# Slide cu listă: stânga text, dreapta număr roșu mare
function ListSlide($out,$tag,$title,$rows,$note,$n,$tot){
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp; $g.Clear($BG)
  $lw=200; $lh=[int]($LOGO.Height*$lw/$LOGO.Width); $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(70,70,$lw,$lh)))
  Tracked $g 70 170 $tag (Fnt 'Segoe UI Semibold' 26) $RED 4 'l'
  $y = Wrap $g $title (Fnt 'Segoe UI Black' 62) $INK 70 210 ($W-140) 70
  $y += 30; $rh=[int]((($H-110-140)-$y)/$rows.Count)
  foreach($r in $rows){
    $g.FillRectangle([System.Drawing.Brushes]::White,70,$y,$W-140,$rh-14)
    $fv=Fnt 'Segoe UI Black' 54; $vw=Wd $g $r[1] $fv
    Txt $g $r[1] $fv $RED ($W-100-$vw) ($y+($rh-14-66)/2)
    Wrap $g $r[0] (Fnt 'Segoe UI Semibold' 34) $INK 100 ($y+($rh-14-40)/2) ($W-260-$vw) 40 | Out-Null
    $y+=$rh
  }
  Wrap $g $note (Fnt 'Segoe UI' 24) $GREY 70 ($H-110-120) ($W-140) 30 | Out-Null
  Footer $g $n $tot; $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

# Slide întrebare–răspuns
function QASlide($out,$tag,$qa,$n,$tot){
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp; $g.Clear($BG)
  $lw=200; $lh=[int]($LOGO.Height*$lw/$LOGO.Width); $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle(70,70,$lw,$lh)))
  Tracked $g 70 170 $tag (Fnt 'Segoe UI Semibold' 26) $RED 4 'l'
  $y=240
  foreach($p in $qa){
    $y = Wrap $g $p[0] (Fnt 'Segoe UI Black' 54) $INK 70 $y ($W-140) 62
    $y += 6; $g.FillRectangle((New-Object System.Drawing.SolidBrush($RED)),70,$y,50,5); $y += 24
    $y = Wrap $g $p[1] (Fnt 'Segoe UI' 38) $INK 70 $y ($W-140) 50
    $y += 60
  }
  Footer $g $n $tot; $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

# Slide final: mesaj + mențiunea UE
function EndSlide($out,$l1,$l2,$claim,$n,$tot){
  $bmp=New-Object System.Drawing.Bitmap($W,$H); $g=NewG $bmp; $g.Clear($INK)
  $lw=300; $lh=[int]($LOGO.Height*$lw/$LOGO.Width)
  $g.FillRectangle([System.Drawing.Brushes]::White,[int](($W-$lw)/2-30),150,$lw+60,$lh+40)
  $g.DrawImage($LOGO,(New-Object System.Drawing.Rectangle([int](($W-$lw)/2),170,$lw,$lh)))
  Center $g $l1 (Fit $g $l1 'Segoe UI Black' 80 ($W-140)) ([System.Drawing.Color]::White) 470
  Center $g $l2 (Fit $g $l2 'Segoe UI Black' 80 ($W-140)) $RED 570
  $y=760; foreach($c in $claim){ $y = Wrap $g $c (Fnt 'Segoe UI' 34) ([System.Drawing.Color]::FromArgb(220,220,224)) 110 $y ($W-220) 46; $y+=16 }
  Center $g 'Linkul e în bio' (Fnt 'Segoe UI Semibold' 40) ([System.Drawing.Color]::White) 1080
  Footer $g $n $tot; $g.Dispose(); SaveJpg $bmp $out; $bmp.Dispose()
}

# K1 – proteina (1.12)
$P1='D:\Prime Supplements\Shooting foto evo gym\shooting evo gym\HILA_13_15_00_56_1399.jpg'
Cover (Join-Path $ROOT 'k1-01.jpg') $P1 0.72 0.5 'PROTEINE · SALVEAZĂ-L' @('CÂTĂ PROTEINĂ','AI ÎN','FARFURIE?')
ListSlide (Join-Path $ROOT 'k1-02.jpg') 'PROTEINĂ PE PORȚIE' 'Alimente obișnuite, porții obișnuite:' @(
  @('100 g piept de pui gătit','~30 g'),
  @('100 g ton (conservă, scurs)','~25 g'),
  @('200 g linte fiartă','~18 g'),
  @('150 g iaurt grecesc','~15 g'),
  @('100 g brânză de vaci','~12 g'),
  @('2 ouă','~12 g')
) 'Valori aproximative, din tabelele uzuale de nutriție; variază după produs și preparare.' 2 4
ListSlide (Join-Path $ROOT 'k1-03.jpg') 'ȘI UN SHAKE' 'Când nu ai timp de gătit:' @(
  @('1 porție Prime Whey (30 g)','~24 g'),
  @('Gata în','30 sec'),
  @('Arome','7')
) 'Prime Whey: 82 g proteine la 100 g de produs, conform etichetei. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată.' 3 4
EndSlide (Join-Path $ROOT 'k1-04.jpg') 'TU CÂTĂ PROTEINĂ' 'MĂNÂNCI PE ZI?' @('Proteinele contribuie la creșterea și menținerea masei musculare.','Scrie-ne în comentarii.') 4 4

# K2 – creatina (21.12)
$P2='D:\Prime Supplements\Poze constanta\DSC09494.jpg'
Cover (Join-Path $ROOT 'k2-01.jpg') $P2 0.62 0.64 'CREATINĂ · 5 ÎNTREBĂRI' @('CREATINA:','5 ÎNTREBĂRI,','5 RĂSPUNSURI') 1.25
QASlide (Join-Path $ROOT 'k2-02.jpg') 'ÎNTREBĂRILE 1–3' @(
  @('Cât iau pe zi?','3 g pe zi. Atât e nevoie pentru efectul ei asupra performanței.'),
  @('Când o iau?','Oricând îți e comod: dimineața, după antrenament, cu o masă. Important e să fie zilnic.'),
  @('Trebuie „încărcare”?','Nu e obligatorie. Cu 3 g în fiecare zi ajungi acolo, doar puțin mai încet.')
) 2 4
QASlide (Join-Path $ROOT 'k2-03.jpg') 'ÎNTREBĂRILE 4–5' @(
  @('Și în zilele fără sală?','Da. Contează aportul zilnic, nu antrenamentul din ziua respectivă.'),
  @('Cu ce o amestec?','Apă, suc, shake-ul de proteină sau iaurt. Creatina Creapure® Prime nu are aromă.')
) 3 4
EndSlide (Join-Path $ROOT 'k2-04.jpg') '3 GRAME.' 'ÎN FIECARE ZI.' @('Creatina crește performanța fizică în cazul unor exerciții succesive de scurtă durată și intensitate ridicată. Efectul benefic se obține la un aport zilnic de 3 g de creatină.') 4 4
$LOGO.Dispose()
