const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1920, height: 1080 });
        await loginMock(page);
    } catch (error) {
        console.log(error.message);
    }
    await page.close();
    await Sleep(5000);
    await browser.close();
})();

async function loginMock(page) {
    let mainPage = 'https://weibo.com/';
    await page.goto(mainPage);
    await page.waitForSelector('#loginname');
    let userElement = await page.$('#loginname');
    await userElement.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.type('username', { delay: 100 });
    let passwordElement = await page.$('[name="password"]');
    await passwordElement.focus();
    await page.keyboard.type('password', { delay: 100 });
    await page.click('a.W_btn_a.btn_32px', { delay: 500 });
    await page.waitForSelector('li.S_line1 a.S_txt1');
}
