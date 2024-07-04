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
        await page.getByLabel('Keywords, name, etc.').fill('Austin');
        await page.locator('i.facetwp-icon').click();
        const screenshotPath = path.join(process.cwd(), 'screenshot.png');
        console.log('Taking screenshot...');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to: ${screenshotPath}`);

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


})().catch(error => console.error('Unhandled error in main function: ', error))