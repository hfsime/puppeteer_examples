const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        page.on('response', async (response) => {
            let url = response.url();
            if (url.indexOf('.m3u8') > -1) {
                try {
                    console.log(url);
                    let baseUrl = common.get_m3u8_base_url(url);
                    let videoName = common.get_m3u8_video_name(url);
                    let m3u8Content = await response.text();
                    let ts_urls = await common.m3u8_parse(baseUrl, m3u8Content);
                } catch (error) {
                    console.log(error.message);
                }
            }
        });
        await page.goto("http://shiliu006.com/thread-27531-1-1.html", { waitUntil: 'load' });
        await page.close();
    } catch (error) {
    }

    await browser.close();
})();
