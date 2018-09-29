async function download_file(file_url, save_dir) {

    //set file save path
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: save_dir });

    //expose write function to page
    await page.exposeFunction('writeFile', (text, save_path) => {
        fs.writeFileSync(save_path, text);
    });

    //using fetch to download file
    await page.evaluate(async url => {
        try {
               let r = await fetch(url, {
                   method: 'GET',
                   credentials: 'same-origin'
               });
               let text = await r.text();
               let strSplit = url.split('/');
               let filename = strSplit[strSplit.length - 1];
               window.writeFile(text, filename);
           } catch (error) {
               console.log(error);
           }
   }, file_url);
}
