
const common = require('./common.js');

// googleのurlに遷移し、
// puppeteerを検索し、
// 最初のページに表示されるリンクにアクセスし、
// スクリーンショットを取得する

const puppeteer = common.create();

puppeteer.then(async browser => {
    const page = await browser.newPage();
    try{
        await common.setConfig(page);

        await page.goto('https://www.google.co.jp/');
        await page.type('input[name="q"]', 'google');
        await common.screenshotAndLog(page, 'sample3-1.png');

        page.click('input[name=btnK]');
        await page.waitForNavigation();
        await common.screenshotAndLog(page, 'sample3-2.png');

        const links = await page.evaluate((selector) => {
            const dataList = [];
            const linkList = Array.from(document.querySelectorAll(selector));
            linkList.forEach((e) =>{
                dataList.push({title: e.innerText, href: e.href});
            });
            return dataList;
        }, '.r > a');

        common.writeLog(page, links);
        for(let i=0; i < links.length; i++){
            await page.goto(links[i].href);
            await common.screenshotAndLog(page, `sample3-${i + 3}.png`);
        }
    }catch(err){
        common.writeError(page, err);
    }finally{
        browser.close();
    }
});
