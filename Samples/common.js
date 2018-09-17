const config = require('config');
const puppeteer = require('puppeteer');
const makeDir = require("make-dir");
const log4js = require('log4js');
log4js.configure(config.log4js);
const logger = log4js.getLogger('info');

/**
 * スクリーンショットをFullPageで撮り、ページタイトルとファイル名をログに出力する。
 * @param {Promise<Page>} page 
 * @param {string} fileName 
 */
exports.screenshotAndLog = async function(page, fileName){
    await makeDir('images');

    fileName = fileName
        .replace('\\', '￥')
        .replace('/', '／')
        .replace(':', '：')
        .replace('*', '＊')
        .replace('?', '？')
        .replace('"', '”')
        .replace('<', '＜')
        .replace('>', '＞')
        .replace('|', '｜');

    let path = './images/' + fileName;
    await page.screenshot({path: path, fullPage: true});
    logger.info(page._target._targetInfo.url);    
    logger.info(path);
}

/**
 * ページタイトルとメッセージをログに出力する。
 * @param {Promise<Page>} page 
 * @param {string} message 
 */
exports.writeLog = function(page, message){
    logger.info(page._target._targetInfo.url);    
    logger.info(message);
}

/**
 * エラーメッセージをログに出力する。
 * @param {Promise<Page>} page 
 * @param {string} message 
 */
exports.writeError = function(page, message){
    logger.error(message);
    logger.error(page._target._targetInfo.url);
}

/**
 * PuppeteerのPromise<Browser>をConfigファイルから生成する。
 */
exports.create = function(){
    let args = [];
    //プロキシ設定
    if(config.proxy.enable){
        args.push(`--proxy-server=${config.proxy.server}`);
    }
    // Chromeウィンドウのサイズ
    if(config.windowSize.width != undefined && config.windowSize.height != undefined){
        args.push(`--window-size=${config.windowSize.width},${config.windowSize.height}`);
    }
    // Chromeウィンドウの位置
    if(config.windowPosition.x != undefined && config.windowPosition.y != undefined){
        args.push(`--window-position=${config.windowPosition.x},${config.windowPosition.y}`);
    }

    return puppeteer.launch({
        args: args,
        headless: config.headless,
        slowMo: config.slowMo,
        ignoreHTTPSErrors: config.ignoreHttpsErrors
    });
}

/**
 * viewportのサイズを設定する
 */
viewport = async function(page){
    await page.setViewport({
        width: config.windowSize.width,
        height: config.windowSize.height
    });
}

/**
 * proxyを設定する
 */
proxy = async function(page){
    if(config.proxy.enable == false) return;
    await page.authenticate({
        username: config.proxy.username,
        password: config.proxy.password
    });
}

/**
 * basic認証を設定する
 */
basic = async function(page){
    if(config.basic.enable == false) return;
    await page.setExtraHTTPHeaders({
        Authorization: `Basic ${new Buffer(`${config.basic.username}:${config.basic.password}`).toString('base64')}`
    });    
}

/**
 * 各操作のタイムアウトを設定する
 */
timeout = function(page){
    page.setDefaultNavigationTimeout(config.timeout);
}

/**
 * 各設定をすべて設定する
 * @param {Promise<Page>} page 
 */
exports.setConfig = async function(page){
    await viewport(page);
    await proxy(page);
    await basic(page);
    timeout(page);
}

/**
 * ConfigのHostに移動する
 * @param {Promise<Page>} page 
 */
exports.gotoConfigUrl = async function(page){
    await page.goto(config.host);
}
