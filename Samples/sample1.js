
const common = require('./common.js');

// googleのurlに遷移し、
// puppeteerを検索し、
// スクリーンショットを取得する

const puppeteer = common.create();

puppeteer.then(async browser => {
    const page = await browser.newPage();
    try{
        await common.setConfig(page);

        await page.goto('https://www.google.co.jp/');
        await page.type('#lst-ib', 'puppeteer');
        await common.screenshotAndLog(page, 'sample1-1.png');

        page.click('.lsb');
        await page.waitForNavigation();
        await common.screenshotAndLog(page, 'sample1-2.png');
    }catch(err){
        common.writeError(page, err);
    }finally{
        browser.close();
    }
});

