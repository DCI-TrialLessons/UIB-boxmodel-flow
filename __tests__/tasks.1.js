const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { 
        this.puppeteer.close(); 
    } catch (e) 
    {} 
    done();
});

describe("Task 1", () => {
    it("Index file should contain appropriate meta tags", async () => {
        const metaTags = await page.$$('meta');
        expect(metaTags.length).toBeGreaterThan(1);
    });
    it("Index file Should contain a title tag that is not empty", async () => {
        const title = await page.$eval('title', el => el.innerHTML);
        expect(title).not.toBe('');
    });
    it("Each section should contain a set of height and width", async () => {
        try {
            const height = await page.$eval('.esports-info', el => getComputedStyle(el).height);
            const width = await page.$eval('.esports-info', el => getComputedStyle(el).width);
            const border = await page.$eval('.esports-info', el => getComputedStyle(el).border);
            expect(border).not.toBe('');
            expect(width).not.toBe('');
            expect(height).not.toBe('');
        } catch (error) {
            throw error;
        }
    });
    it("Each image should contain a set of height and width", async () => {
        const images = await page.$$('img');
        const imageHeight = await page.$eval('img', el => getComputedStyle(el).height);
        const imageWidth = await page.$eval('img', el => getComputedStyle(el).width);
        expect(imageHeight).not.toBe('');
        expect(imageWidth).not.toBe('');
    });

    it("Content inside the section tags should be Scrollable", async () => {
        const sections = await page.$$('section');
        for (let i = 0; i < sections.length; i++) {
            const isScrollable = await sections[i].evaluate(el => el.scrollHeight > el.clientHeight);
            expect(isScrollable).toBe(true);
        }
    });
});

describe("Task 2", () => {
    it("Float css property should be present in styling", async () => {
        try {
            //iterate's through all the elements on the page and check if the float property is at least greater than 1
            const floatProperty = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('float')));
            expect(floatProperty.length).toBeGreaterThan(1);
            expect(floatProperty).toBeTruthy();    
        } catch (error) {
            throw error;
        }

    })
})