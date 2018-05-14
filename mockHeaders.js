const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ userDataDir: 'userDataSaveDir' });

    try {
        const page = await browser.newPage();
        let headers = consstruct_headers();
        await page.setExtraHTTPHeaders(headers);
        await page.goto("https://github.com/hfsime/puppeteer_examples/tree/master", { waitUntil: 'load' });
        await page.screenshot({ fullPage: true, path: 'github.jpg' });
        await page.close();
    } catch (error) {
        
    }

    await browser.close();
})();

function consstruct_headers() {
    let headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'your_cookie',
        'Host': 'github.com',
        'Referer': 'https://github.com/hfsime/puppeteer_examples/new/master',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    };
    return headers;
}
