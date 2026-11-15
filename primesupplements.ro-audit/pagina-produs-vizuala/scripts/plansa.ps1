# Planșă cu miniaturi numerotate: plansa.ps1 <folder> <filtru regex pe nume> <ieșire.jpg> [coloane]
param([string]$dir, [string]$re, [string]$out, [int]$cols = 6)
Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem $dir -File | Where-Object { $_.Name -match $re -and $_.Extension -match '\.(jpe?g|png)$' } | Sort-Object Name
$tw = 260; $th = 260; $rows = [math]::Ceiling($files.Count / $cols)
$sheet = New-Object System.Drawing.Bitmap ($cols * $tw), ($rows * $th)
$g = [System.Drawing.Graphics]::FromImage($sheet); $g.Clear([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font 'Arial', 14, ([System.Drawing.FontStyle]::Bold)
$i = 0
foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $s = [math]::Min(($tw - 6) / $img.Width, ($th - 6) / $img.Height)
  $w = [int]($img.Width * $s); $h = [int]($img.Height * $s)
  $x = ($i % $cols) * $tw + 3; $y = [math]::Floor($i / $cols) * $th + 3
  $g.DrawImage($img, $x, $y, $w, $h); $img.Dispose()
  $g.FillRectangle([System.Drawing.Brushes]::Yellow, $x, $y, 44, 22)
  $g.DrawString("$i", $font, [System.Drawing.Brushes]::Black, $x + 2, $y + 1)
  "$i $($f.Name)"
  $i++
}
$sheet.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg); $g.Dispose(); $sheet.Dispose()
