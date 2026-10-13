import puppeteer from 'puppeteer-core';
const [,, url] = process.argv;
const browser = await puppeteer.launch({executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: 'new',
  args: ['--no-sandbox','--proxy-server=http://127.0.0.1:33241','--disable-dev-shm-usage']});
const page = await browser.newPage();
await page.setViewport({width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true});
const cdp = await page.createCDPSession();
await cdp.send('Network.enable');
const reqs = new Map();
cdp.on('Network.requestWillBeSent', e => { if (/\/null$|firebase-config|firebase-messaging/.test(e.request.url)) console.log('REQ', e.request.url, e.type, JSON.stringify(e.initiator).slice(0, 1500)); });
await page.goto(url, {waitUntil: 'networkidle2', timeout: 90000});
await new Promise(r => setTimeout(r, 4000));
await browser.close();
