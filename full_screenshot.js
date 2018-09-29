const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://www.x23us.com/', { waitUntil: 'load' });
        await full_screenshot0(page, 'x23us.jpg');
    } catch (error) {
        console.log(error.message);
    }
    await page.close();
    await browser.close();
})();

async function full_screenshot0(page, save_path) {
    //js scroll
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

async function full_screenshot1(page, save_path, mouse_click_selector) {
    //mouse and keyboard mock
    let areaElement = await page.$(mouse_click_selector);
    let bound = await areaElement.boundingBox();
    await page.mouse.click(bound.x + 1, bound.y + 1);
    await page.keyboard.press('End', { delay: 2000 });
}

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
