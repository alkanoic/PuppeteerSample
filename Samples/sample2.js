
const common = require('./common.js');

// gotoUrlListのurlを順次アクセスし、
// fileに保存する

const puppeteer = common.create();
const gotoUrlList = [
    {url: "http://google.co.jp", file: "sample2-1-google.png"}
    ,{url: "https://www.bing.com/", file: "sample2-2-bing.png"}
];

puppeteer.then(async browser => {
    const page = await browser.newPage();
    try{
        await common.setConfig(page);

        for(var i=0 ; i<gotoUrlList.length ; i++){
            await page.goto(gotoUrlList[i].url);
            await common.screenshotAndLog(page, gotoUrlList[i].file);
        }
    }catch(err){
        common.writeError(page, err);
    }finally{
        browser.close();
    }
});
