#!/usr/bin/env bash
# usage: build-pdf.sh <input.md> <output.pdf> <title>
set -euo pipefail
export LANG=C.UTF-8 LC_ALL=C.UTF-8
IN="$1"; OUT="$2"; TITLE="${3:-Report}"
DIR=$(cd "$(dirname "$0")" && pwd)
HTML="$DIR/$(basename "$IN" .md).html"
cat > "$DIR/style.css" <<'CSS'
body{font-family:"DejaVu Sans",Arial,sans-serif;font-size:10.5pt;line-height:1.45;color:#1a1a1a;max-width:900px;margin:0 auto;padding:24px}
h1{font-size:22pt;border-bottom:3px solid #c8102e;padding-bottom:6px;margin-top:28px}
h2{font-size:16pt;color:#c8102e;margin-top:26px;border-bottom:1px solid #ddd;padding-bottom:4px}
h3{font-size:12.5pt;margin-top:18px}
h4{font-size:11pt;margin-top:14px}
table{border-collapse:collapse;width:100%;margin:10px 0;font-size:9.5pt}
th,td{border:1px solid #ccc;padding:5px 7px;vertical-align:top;text-align:left}
th{background:#f3f3f3}
code{font-family:"DejaVu Sans Mono",monospace;font-size:9pt;background:#f5f5f5;padding:1px 3px}
pre{background:#f5f5f5;padding:10px;overflow-x:auto;font-size:8.5pt;white-space:pre-wrap;word-break:break-word}
blockquote{border-left:4px solid #c8102e;margin:10px 0;padding:4px 12px;background:#fdf3f4}
a{color:#0b57d0;text-decoration:none}
tr,pre,blockquote,h2,h3{page-break-inside:avoid}
h2{page-break-before:auto}
CSS
pandoc "$IN" -f gfm -t html5 -s --metadata pagetitle="$TITLE" --css "$DIR/style.css" --embed-resources -o "$HTML" 2>/dev/null || pandoc "$IN" -f gfm -t html5 -s --metadata pagetitle="$TITLE" -H <(echo "<style>$(cat "$DIR/style.css")</style>") -o "$HTML"
export NODE_PATH=$(node -e "console.log(require.resolve('playwright').split('/node_modules/')[0]+'/node_modules')")
node - "$HTML" "$OUT" <<'JS'
const { chromium } = require('playwright');
(async () => {
  const [html, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + html, { waitUntil: 'load' });
  await page.pdf({ path: out, format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' }, displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#888">primesupplements.ro SEO audit · <span class="pageNumber"></span>/<span class="totalPages"></span></div>' });
  await browser.close();
  console.log('pdf written', out);
})().catch(e => { console.error(e); process.exit(1); });
JS
