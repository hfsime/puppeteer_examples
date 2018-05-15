const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://www.x23us.com/', { waitUntil: 'load' });
        await fullScreenshot(page, 'x23us.jpg');
    } catch (error) {
        console.log(error.message);
    }
    await page.close();
    await browser.close();
})();

async function fullScreenshot(page, savePath) {
    let scrollEnable = true;
    let scrollStep = 100;
    while (scrollEnable) {
        scrollEnable = await page.evaluate((scrollStep) => {
            let scrollTop = document.scrollingElement.scrollTop;
            document.scrollingElement.scrollTop = scrollTop + scrollStep;
            return document.body.clientHeight > scrollTop + 1080 ? true : false;
        }, scrollStep);
        await sleep(100);
    }
    await page.screenshot({ path: savePath, fullPage: true });
}

function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1);
            } catch (e) {
                reject(0);
            }
        }, delay);
    });
}
