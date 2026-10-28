# Convertește HTML-urile generate de build-contracte.mjs în DOCX + PDF prin Word (antet cu logo, numerotare pagini).
param([Parameter(Mandatory=$true)][string]$Dir,
      [string]$Logo = "D:\Prime Supplements\logo vectoriale\poze prime vectoriale\Logo Vectoriale\Logo-prime.png")
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  Get-ChildItem -Path $Dir -Filter *.html | ForEach-Object {
    $doc = $word.Documents.Open($_.FullName, $false, $true)
    $doc.ActiveWindow.View.Type = 3   # wdPrintView
    $s = $doc.Sections.Item(1)
    $ps = $s.PageSetup
    $ps.PaperSize = 7                 # A4
    $ps.TopMargin = 85; $ps.BottomMargin = 62; $ps.LeftMargin = 71; $ps.RightMargin = 62
    $ps.HeaderDistance = 28; $ps.FooterDistance = 28
    $hdr = $s.Headers.Item(1).Range
    $pic = $hdr.InlineShapes.AddPicture($Logo, $false, $true)
    $sc = [math]::Round(12000 / $pic.Width)
    $pic.ScaleWidth = $sc; $pic.ScaleHeight = $sc
    $hdr.ParagraphFormat.Alignment = 2    # dreapta
    $ftr = $s.Footers.Item(1)
    $null = $ftr.PageNumbers.Add(2, $true) # centru, inclusiv prima pagină
    $base = Join-Path $_.DirectoryName $_.BaseName
    $doc.SaveAs2("$base.docx", 16)        # wdFormatXMLDocument
    $doc.SaveAs2("$base.pdf", 17)         # wdFormatPDF
    $doc.Close($false)
    Remove-Item $_.FullName
    "ok $($_.BaseName)"
  }
} finally { $word.Quit() }
