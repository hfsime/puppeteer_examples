const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ userDataDir: 'userDataSaveDir' });

    try {
        const page = await browser.newPage();
        await page.goto("https://www.baidu.com", { waitUntil: 'load' });
        //login operate
        //...

        const browser0 = await puppeteer.launch({ userDataDir: 'sameUserDataSaveDir' });
        const page0 = await browser0.newPage();
        //can share page session state,like login state and so on.
        await page0.goto("https://www.baidu.com", { waitUntil: 'load' });
        await page0.close();
        await browser0.close();

        await page.close();
    } catch (error) {
        
    }

    await browser.close();
})();
