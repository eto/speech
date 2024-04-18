#!/usr/bin/env node
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false}); // ヘッドレスモードを無効に
    const page = await browser.newPage();
    await page.goto('https://<your-username>.github.io/<repo-name>/');

    await page.click('#start'); // 音声認識を開始するボタンをクリック

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.waitForSelector('#results'); // 結果が表示されるまで待機
    const results = await page.evaluate(() => document.querySelector('#results').textContent);
    console.log(results);

    await browser.close();
})();
