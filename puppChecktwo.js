//dunzo parcel price getter automation
const puppeteer = require('puppeteer')
url = 'https://www.swiggy.com/restaurants'
async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await browser.close();

}
run();
//first address click kfSQKN
// click on bIlSir
//type in b11....
//click on first hqIdmi
//click on kcSRbj
//type in bpyVvo
//press enter

//second address click eulfiR