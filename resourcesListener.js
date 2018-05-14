const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        page.on('response', async (response) => {
            let buffer = await response.buffer();
            console.log(response.url());
            //...
        });
        await page.goto("https://www.baidu.com", { waitUntil: 'load' });

        await page.close();
    } catch (error) {
        
    }

    await browser.close();
})();
