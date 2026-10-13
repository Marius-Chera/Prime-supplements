#!/bin/bash
# Mobile Lighthouse on the LIVE homepage with one third party blocked at a time (read-only; nothing on the store changes).
S=/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad
cd $S/lh/apps
URL="${1:-https://primesupplements.ro/}"
TAG="${2:-home}"
declare -A G
G[none]=""
G[clarity]="*clarity.ms*"
G[popconvert]="*pop-convert.com*"
G[facebook]="*connect.facebook.net* *facebook.com/tr*"
G[google]="*googletagmanager.com* *google-analytics.com* *doubleclick.net* *googleadservices.com*"
G[themarketer]="*themarketer.com* *mktr2.com* */apps/mktr/* *gstatic.com/firebasejs*"
G[judgeme]="*judgeme* *judge.me*"
G[uppromote]="*secomapp* *uppromote*"
G[pandectes]="*pandectes* *gdpr-cookie-consent*"
G[dondy]="*dondy*"
G[estimator]="*estimator*"
G[simprosys]="*storage.googleapis.com*"
G[shopifypixels]="*/cdn/wpm/* */web-pixels*"
G[all3p]="*clarity.ms* *pop-convert.com* *connect.facebook.net* *facebook.com/tr* *googletagmanager.com* *google-analytics.com* *doubleclick.net* *googleadservices.com* *themarketer.com* *mktr2.com* */apps/mktr/* *gstatic.com/firebasejs* *secomapp* *uppromote* *dondy* *storage.googleapis.com*"
ORDER="${3:-none clarity popconvert facebook google themarketer judgeme uppromote dondy estimator simprosys shopifypixels all3p none}"
i=0
for g in $ORDER; do
  i=$((i+1))
  args=()
  for p in ${G[$g]}; do args+=("--blocked-url-patterns=$p"); done
  out=$TAG-$i-$g.json
  CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome timeout 300 $S/lhtool/node_modules/.bin/lighthouse "$URL" "${args[@]}" --only-categories=performance --output=json --output-path=$out --chrome-flags="--headless=new --no-sandbox --proxy-server=http://127.0.0.1:33241 --disable-dev-shm-usage" --quiet >/dev/null 2>&1
  python3 -c "
import json;d=json.load(open('$out'));A=d['audits'];print('$TAG','$i','$g',round(d['categories']['performance']['score']*100),{k:round(A[k]['numericValue']) for k in ['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time']}, round(A['cumulative-layout-shift']['numericValue'],3))" 2>&1
  sleep 5
done
echo DONE
