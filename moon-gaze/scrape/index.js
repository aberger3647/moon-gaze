const { firefox } = require('playwright');
const path = require('path');

(async () => {    
    const browser = await firefox.launch({
    headless: false,
});
    try {
        console.log('Attempting to launch Firefox')
    console.log("Launch successful")
    const page = await browser.newPage();
        await page.goto(
            "https://darksky.org/what-we-do/international-dark-sky-places/all-places/"
        );
        // await page.screenshot({ path: 'page.png' });

        const screenshotPath = path.join(process.cwd(), 'example_screenshot.png');
        console.log('Taking screenshot...');
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved to: ${screenshotPath}`);
        // await page.getByLabel('Keywords, name, etc.').fill('Austin');
        // await page.getByRole('i', { class: 'facetwp-icon' }).click();

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed');
    }
    console.log('Script finished');
  }


// // Keep the Node.js process alive
// process.on('unhandledRejection', (reason, promise) => {
//   console.log('Unhandled Rejection at:', promise, 'reason:', reason);
//   // Application specific logging, throwing an error, or other logic here
// });

})().catch(error => console.error('Unhandled error in main function: ', error))