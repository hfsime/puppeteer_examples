const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://www.x23us.com/', { waitUntil: 'load' });
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
        await page.click('selector');
        let newPage = await newPagePromise;
        await newPage.close();
    } catch (error) {
        console.log(error.message);
    }
    await page.close();
    await browser.close();
})();
