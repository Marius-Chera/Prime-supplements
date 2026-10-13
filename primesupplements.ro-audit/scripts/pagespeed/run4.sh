#!/bin/bash
S=/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad
cd $S/lh
P=preview_theme_id=193875083639
for spec in "mobile|https://primesupplements.ro/?$P|stg4-home" \
            "mobile|https://primesupplements.ro/products/prime-whey-2000g?$P|stg4-product" \
            "mobile|https://primesupplements.ro/collections/pudra-proteica?$P|stg4-collection" \
            "mobile|https://primesupplements.ro/blogs/news/ce-este-intra-workout?$P|stg4-article" \
            "desktop|https://primesupplements.ro/?$P|stg4-desk-home" \
            "desktop|https://primesupplements.ro/products/prime-whey-2000g?$P|stg4-desk-product" \
            "desktop|https://primesupplements.ro/products/prime-whey-2000g|live-desk-product"; do
  IFS='|' read mode u n <<< "$spec"
  extra=""; [ $mode = desktop ] && extra="--preset=desktop"
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome timeout 300 $S/lhtool/node_modules/.bin/lighthouse "$u" $extra --output=json --output-path=$S/lh/$n.json --chrome-flags="--headless=new --no-sandbox --proxy-server=http://127.0.0.1:33241 --disable-dev-shm-usage" --quiet 2>&1 | tail -2
  python3 -c "
import json;d=json.load(open('$S/lh/$n.json'));A=d['audits'];print('== $n',[(k,round(c['score']*100)) for k,c in d['categories'].items()], {m:A[m]['displayValue'] for m in ['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift']}, 'unsized',A['unsized-images']['score'])"
  sleep 8
done
echo ALLDONE
