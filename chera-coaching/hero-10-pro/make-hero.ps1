<#
  Chera Protocol – imaginea principală „10 sportivi cu card IFBB Pro. Un singur antrenor.”
  Montaj fotografic real (fără AI): Marius în centru, cei 10 sportivi cu cardurile Pro în jur,
  pe paleta „smooth” a site-ului (31.10.2026). Doar .NET (System.Drawing) prin PowerShell 5.1.

  Rulare (din orice folder):
    powershell -ExecutionPolicy Bypass -File chera-coaching\hero-10-pro\make-hero.ps1 [-Only desktop,telefon,site]
  Sursele (neversionate, repo public): chera-coaching\poze site\imageNNNNN.jpeg + „maruo card.jpg”,
  plus chera-coaching\upload-shopify-files\chera-pro-card-a.webp (convertit în PNG cu Chrome headless, în cache\).
  Decupajele sunt în crops.json (fracțiuni din poza rotită după EXIF). Ieșirile: upload-shopify-files\chera-hero-10-pro-*.jpg
#>
param(
  [string]$Repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path,
  [string]$Poze = '',
  [string]$Out = '',
  [string[]]$Only = @()
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
if (-not $Poze) { $Poze = Join-Path $Repo 'chera-coaching\poze site' }
if (-not $Out)  { $Out  = Join-Path $Repo 'chera-coaching\upload-shopify-files' }
$cache = Join-Path $PSScriptRoot 'cache'; New-Item -ItemType Directory -Force $cache | Out-Null
$fontsDir = Join-Path $Repo 'chera-coaching\brand\fonts'

# ---------- paleta smooth (DESIGN-PALETA-SMOOTH-2026-10-31.md) ----------
function C([string]$hex, [int]$a = 255) { $c = [System.Drawing.ColorTranslator]::FromHtml($hex); [System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B) }
$BG = C '#f3efe8'; $BAR = C '#f0f2f5'; $INK = C '#111b21'; $INK2 = C '#54656f'; $LINE = C '#dcd6cc'; $RED = C '#a8322b'; $WHITE = C '#ffffff'

# ---------- fonturi Barlow (din repo) ----------
$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile((Join-Path $fontsDir 'BarlowCondensed-ExtraBold.ttf'))
$pfc.AddFontFile((Join-Path $fontsDir 'Barlow-SemiBold.ttf'))
$famCond = $pfc.Families | Where-Object { $_.Name -like 'Barlow Condensed*' } | Select-Object -First 1
$famBody = $pfc.Families | Where-Object { $_.Name -notlike 'Barlow Condensed*' } | Select-Object -First 1
if (-not $famCond -or -not $famBody) { throw "Fonturile Barlow nu s-au încărcat: $($pfc.Families.Name -join ', ')" }
function StyleFor($fam) { foreach ($s in 'Bold', 'Regular') { $st = [System.Drawing.FontStyle]$s; if ($fam.IsStyleAvailable($st)) { return $st } }; return [System.Drawing.FontStyle]::Regular }
function FontCond([single]$px) { [System.Drawing.Font]::new($famCond, $px, (StyleFor $famCond), [System.Drawing.GraphicsUnit]::Pixel) }
function FontBody([single]$px) { [System.Drawing.Font]::new($famBody, $px, (StyleFor $famBody), [System.Drawing.GraphicsUnit]::Pixel) }

# ---------- surse ----------
$crops = Get-Content (Join-Path $PSScriptRoot 'crops.json') -Raw -Encoding UTF8 | ConvertFrom-Json
function Resolve-Source([string]$name) {
  if ($name -eq 'hero-doua-carduri.png') {
    $png = Join-Path $cache $name
    if (-not (Test-Path $png)) {
      $webp = Join-Path $Repo 'chera-coaching\upload-shopify-files\chera-pro-card-a.webp'
      $html = Join-Path $cache 'show.html'
      Copy-Item $webp (Join-Path $cache 'chera-pro-card-a.webp') -Force
      '<!doctype html><html><body style="margin:0;background:#000"><img src="chera-pro-card-a.webp" style="display:block;width:1200px;height:1600px"></body></html>' | Set-Content $html -Encoding ASCII
      $chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe", "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
      if (-not $chrome) { throw 'Nu găsesc Chrome/Brave pentru conversia WebP → PNG' }
      & $chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1200,1600 "--screenshot=$png" ("file:///" + ($html -replace '\\', '/')) 2>$null | Out-Null
      if (-not (Test-Path $png)) { throw 'Conversia WebP a eșuat' }
    }
    return $png
  }
  return (Join-Path $Poze $name)
}
$imgCache = @{}
function Load-Image([string]$name) {
  if ($imgCache.ContainsKey($name)) { return $imgCache[$name] }
  $path = Resolve-Source $name
  $img = [System.Drawing.Image]::FromFile($path)
  if ($img.PropertyIdList -contains 0x112) {
    $o = $img.GetPropertyItem(0x112).Value[0]
    switch ($o) { 3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') } }
  }
  $imgCache[$name] = $img; return $img
}

# ---------- desen ----------
function RoundRect([single]$x, [single]$y, [single]$w, [single]$h, [single]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = 2 * $r
  $p.AddArc($x, $y, $d, $d, 180, 90); $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90); $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure(); return $p
}
function Draw-Card($g, $spec, [single]$x, [single]$y, [single]$w, [single]$h, [single]$rot, [single]$frame, [string]$tag, [single]$tagPx) {
  $img = Load-Image $spec.src
  $cx = $x + $w / 2; $cy = $y + $h / 2
  $st = $g.Save()
  $g.TranslateTransform($cx, $cy); $g.RotateTransform($rot)
  $lx = -$w / 2; $ly = -$h / 2
  # umbra (fără blur în GDI+: straturi concentrice translucide)
  for ($i = 7; $i -ge 1; $i--) {
    $sp = RoundRect ($lx - $i * 1.6) ($ly + 10 - $i * 0.6) ($w + $i * 3.2) ($h + $i * 3.2) (14 + $i)
    $br = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 17, 27, 33))
    $g.FillPath($br, $sp); $br.Dispose(); $sp.Dispose()
  }
  # rama albă
  $fp = RoundRect $lx $ly $w $h 14
  $wb = New-Object System.Drawing.SolidBrush $WHITE; $g.FillPath($wb, $fp); $wb.Dispose()
  $pen = New-Object System.Drawing.Pen $LINE, 1; $g.DrawPath($pen, $fp); $pen.Dispose(); $fp.Dispose()
  # poza decupată (fracțiuni) → umple interiorul (cover, centrat)
  $ix = $lx + $frame; $iy = $ly + $frame; $iw = $w - 2 * $frame; $ih = $h - 2 * $frame
  $sx = [int]($img.Width * $spec.x0); $sy = [int]($img.Height * $spec.y0)
  $sw = [int]($img.Width * ($spec.x1 - $spec.x0)); $sh = [int]($img.Height * ($spec.y1 - $spec.y0))
  $scale = [Math]::Max($iw / $sw, $ih / $sh)
  $cw = [int]($iw / $scale); $ch = [int]($ih / $scale)
  $sx += [int](($sw - $cw) / 2); $sy += [int](($sh - $ch) / 2)
  $ip = RoundRect $ix $iy $iw $ih 8
  $g.SetClip($ip)
  $g.DrawImage($img, (New-Object System.Drawing.RectangleF $ix, $iy, $iw, $ih), (New-Object System.Drawing.RectangleF $sx, $sy, $cw, $ch), [System.Drawing.GraphicsUnit]::Pixel)
  $g.ResetClip(); $ip.Dispose()
  # eticheta roșie
  if ($tag) {
    $f = FontCond $tagPx
    $sz = $g.MeasureString($tag, $f, 2000, [System.Drawing.StringFormat]::GenericTypographic)
    $tw = $sz.Width + $tagPx * 1.1; $th = $tagPx * 1.55
    $tx = $ix + $frame * 0.9; $ty = $iy + $ih - $th - $frame * 0.9
    $tp = RoundRect $tx $ty $tw $th ($th / 2)
    $rb = New-Object System.Drawing.SolidBrush $RED; $g.FillPath($rb, $tp); $rb.Dispose(); $tp.Dispose()
    $tb = New-Object System.Drawing.SolidBrush $WHITE
    $g.DrawString($tag, $f, $tb, $tx + $tagPx * 0.55, $ty + ($th - $sz.Height) / 2 + 1, [System.Drawing.StringFormat]::GenericTypographic)
    $tb.Dispose(); $f.Dispose()
  }
  $g.Restore($st)
}
function Draw-Spaced($g, [string]$text, $font, $brush, [single]$cx, [single]$y, [single]$spacing) {
  $fmt = [System.Drawing.StringFormat]::GenericTypographic
  $widths = @(); $total = 0
  foreach ($ch in $text.ToCharArray()) { $w = $g.MeasureString([string]$ch, $font, 1000, $fmt).Width; if ($ch -eq ' ') { $w = $font.Size * 0.3 }; $widths += $w; $total += $w + $spacing }
  $total -= $spacing
  $x = $cx - $total / 2
  for ($i = 0; $i -lt $text.Length; $i++) { $g.DrawString([string]$text[$i], $font, $brush, $x, $y, $fmt); $x += $widths[$i] + $spacing }
}
function Draw-Headline($g, [string[]]$parts, [System.Drawing.Color[]]$colors, $font, [single]$cx, [single]$y) {
  $fmt = New-Object System.Drawing.StringFormat ([System.Drawing.StringFormat]::GenericTypographic)
  $fmt.FormatFlags = $fmt.FormatFlags -bor [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces
  $total = 0; $ws = @()
  for ($i = 0; $i -lt $parts.Count; $i++) { $w = $g.MeasureString($parts[$i], $font, 4000, $fmt).Width; $ws += $w; $total += $w }
  $x = $cx - $total / 2
  for ($i = 0; $i -lt $parts.Count; $i++) { $b = New-Object System.Drawing.SolidBrush $colors[$i]; $g.DrawString($parts[$i], $font, $b, $x, $y, $fmt); $b.Dispose(); $x += $ws[$i] }
}
function Draw-Centered($g, [string]$text, $font, $brush, [single]$cx, [single]$y) {
  $fmt = [System.Drawing.StringFormat]::GenericTypographic
  $w = $g.MeasureString($text, $font, 4000, $fmt).Width
  $g.DrawString($text, $font, $brush, $cx - $w / 2, $y, $fmt)
}
function Draw-Background($g, [int]$W, [int]$H, [string]$ghost, [single]$ghostPx, [single]$ghostY) {
  $g.Clear($BG)
  # pete moi gri-deschis (bara WhatsApp) pentru adâncime
  foreach ($e in @(@(-0.15, -0.2, 0.7, 0.9), @(0.55, 0.45, 0.7, 0.9))) {
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p.AddEllipse([single]($W * $e[0]), [single]($H * $e[1]), [single]($W * $e[2]), [single]($H * $e[3]))
    $pb = New-Object System.Drawing.Drawing2D.PathGradientBrush $p
    $pb.CenterColor = [System.Drawing.Color]::FromArgb(255, $BAR.R, $BAR.G, $BAR.B)
    $pb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $BAR.R, $BAR.G, $BAR.B))
    $g.FillPath($pb, $p); $pb.Dispose(); $p.Dispose()
  }
  # textul uriaș conturat (ca „CHERA PROTOCOL” din subsolul site-ului)
  if ($ghost) {
    $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $fmt = [System.Drawing.StringFormat]::GenericTypographic
    $f = FontCond $ghostPx
    $sz = $g.MeasureString($ghost, $f, 20000, $fmt)
    $gp.AddString($ghost, $famCond, [int](StyleFor $famCond), $ghostPx, (New-Object System.Drawing.PointF (($W - $sz.Width) / 2), $ghostY), $fmt)
    $pen = New-Object System.Drawing.Pen (C '#d9d2c7'), 2
    $g.DrawPath($pen, $gp); $pen.Dispose(); $gp.Dispose(); $f.Dispose()
  }
}
function New-Canvas([int]$W, [int]$H) {
  $bmp = New-Object System.Drawing.Bitmap $W, $H, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.TextRenderingHint = 'AntiAliasGridFit'; $g.CompositingQuality = 'HighQuality'
  return @($bmp, $g)
}
function Save-Jpeg($bmp, [string]$path, [int]$maxKB = 480) {
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $kb = 0
  foreach ($q in 88, 84, 80, 76, 72, 68, 64, 60) {
    $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
    $bmp.Save($path, $enc, $ep); $ep.Dispose()
    $kb = [int]((Get-Item $path).Length / 1024)
    if ($kb -le $maxKB) { return "$path  ${kb} KB (q$q)" }
  }
  return "$path  ${kb} KB (q60, peste limită)"
}

$S = @{}; foreach ($k in $crops.PSObject.Properties.Name) { $S[$k] = $crops.$k }
$ath = @('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J')
$rots = @(-3.2, 2.4, -1.8, 2.8, -2.6, 2.2, -3.0, 1.9, -2.3, 3.1)

# ================= 1. Desktop 1920×1080 (wallpaper, cu text) =================
if (-not $Only -or $Only -contains 'desktop') {
  $W = 1920; $H = 1080; $r = New-Canvas $W $H; $bmp = $r[0]; $g = $r[1]
  Draw-Background $g $W $H 'CHERA PROTOCOL' 210 950
  $cw = 240; $ch = 300; $gap = 30
  $outerY = @(60, (60 + $ch + $gap), (60 + 2 * ($ch + $gap))); $innerY = @(225, (225 + $ch + $gap))
  $pos = @(
    @(80, $outerY[0]), @(80, $outerY[1]), @(80, $outerY[2]), @(410, $innerY[0]), @(410, $innerY[1]),
    @(1270, $innerY[0]), @(1270, $innerY[1]), @(1600, $outerY[0]), @(1600, $outerY[1]), @(1600, $outerY[2])
  )
  for ($i = 0; $i -lt 10; $i++) { Draw-Card $g $S[$ath[$i]] $pos[$i][0] $pos[$i][1] $cw $ch $rots[$i] 9 'IFBB PRO' 15 }
  # textul de sus
  $eb = New-Object System.Drawing.SolidBrush $INK2
  Draw-Spaced $g 'MARIUS CHERA · CHERA PROTOCOL' (FontBody 17) $eb 960 56 3.2
  $hf = FontCond 62
  Draw-Headline $g @('10 SPORTIVI CU CARD ', 'IFBB PRO.') @($INK, $RED) $hf 960 86
  # cardul central
  Draw-Card $g $S['M'] 740 190 440 550 0 12 'MARIUS CHERA · ANTRENOR' 17
  # textul de jos
  Draw-Centered $g 'UN SINGUR ANTRENOR.' (FontCond 66) (New-Object System.Drawing.SolidBrush $INK) 960 772
  Draw-Centered $g 'Singurul antrenor din România cu 10 sportivi care au luat cardul IFBB Pro.' (FontBody 21) $eb 960 856
  $rb = New-Object System.Drawing.SolidBrush $RED; $g.FillRectangle($rb, 936, 902, 48, 3); $rb.Dispose()
  Draw-Spaced $g 'CHERAPROTOCOL.RO' (FontBody 15) $eb 960 918 3
  $g.Dispose(); Save-Jpeg $bmp (Join-Path $Out 'chera-hero-10-pro-desktop.jpg'); $bmp.Dispose()
}

# ================= 2. Telefon 1080×1920 (wallpaper, cu text) =================
if (-not $Only -or $Only -contains 'telefon') {
  $W = 1080; $H = 1920; $r = New-Canvas $W $H; $bmp = $r[0]; $g = $r[1]
  Draw-Background $g $W $H 'CHERA' 420 1480
  $eb = New-Object System.Drawing.SolidBrush $INK2
  Draw-Spaced $g 'MARIUS CHERA · CHERA PROTOCOL' (FontBody 20) $eb 540 90 3.6
  $hf = FontCond 84
  Draw-Centered $g '10 SPORTIVI' $hf (New-Object System.Drawing.SolidBrush $INK) 540 128
  Draw-Headline $g @('CU CARD ', 'IFBB PRO.') @($INK, $RED) $hf 540 212
  $cw = 280; $ch = 350
  $top = @(@(60, 340), @(400, 340), @(740, 340)); $bot = @(@(60, 1420), @(400, 1420), @(740, 1420))
  $side = @(@(40, 760), @(40, 1090), @(810, 760), @(810, 1090))
  for ($i = 0; $i -lt 3; $i++) { Draw-Card $g $S[$ath[$i]] $top[$i][0] $top[$i][1] $cw $ch $rots[$i] 9 'IFBB PRO' 16 }
  for ($i = 0; $i -lt 4; $i++) { Draw-Card $g $S[$ath[3 + $i]] $side[$i][0] $side[$i][1] 230 288 $rots[3 + $i] 8 'IFBB PRO' 14 }
  for ($i = 0; $i -lt 3; $i++) { Draw-Card $g $S[$ath[7 + $i]] $bot[$i][0] $bot[$i][1] $cw $ch $rots[7 + $i] 9 'IFBB PRO' 16 }
  Draw-Card $g $S['M'] 300 720 480 600 0 12 'MARIUS CHERA · ANTRENOR' 17
  Draw-Centered $g 'UN SINGUR ANTRENOR.' (FontCond 70) (New-Object System.Drawing.SolidBrush $INK) 540 1790
  $rb = New-Object System.Drawing.SolidBrush $RED; $g.FillRectangle($rb, 516, 1876, 48, 3); $rb.Dispose()
  $g.Dispose(); Save-Jpeg $bmp (Join-Path $Out 'chera-hero-10-pro-telefon.jpg'); $bmp.Dispose()
}

# ================= 3. Site (rama hero 4:5, 1200×1500, fără text – titlul e lângă poză) =================
if (-not $Only -or $Only -contains 'site') {
  $W = 1200; $H = 1500; $r = New-Canvas $W $H; $bmp = $r[0]; $g = $r[1]
  Draw-Background $g $W $H 'PRO' 520 1040
  $cw = 300; $ch = 375
  $top = @(@(60, 30), @(450, 30), @(840, 30)); $bot = @(@(60, 1095), @(450, 1095), @(840, 1095))
  $side = @(@(50, 430), @(50, 760), @(900, 430), @(900, 760))
  for ($i = 0; $i -lt 3; $i++) { Draw-Card $g $S[$ath[$i]] $top[$i][0] $top[$i][1] $cw $ch $rots[$i] 10 'IFBB PRO' 17 }
  for ($i = 0; $i -lt 4; $i++) { Draw-Card $g $S[$ath[3 + $i]] $side[$i][0] $side[$i][1] 250 312 $rots[3 + $i] 9 'IFBB PRO' 15 }
  for ($i = 0; $i -lt 3; $i++) { Draw-Card $g $S[$ath[7 + $i]] $bot[$i][0] $bot[$i][1] $cw $ch $rots[7 + $i] 10 'IFBB PRO' 17 }
  Draw-Card $g $S['M'] 340 425 520 650 0 13 'MARIUS CHERA · ANTRENOR' 19
  $g.Dispose(); Save-Jpeg $bmp (Join-Path $Out 'chera-hero-10-pro-site.jpg'); $bmp.Dispose()
}
foreach ($im in $imgCache.Values) { $im.Dispose() }
