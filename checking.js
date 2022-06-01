const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://borzodelivery.com/in/order";

// Async function which scrapes the data
async function scrapeData() {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    console.log($.html());
    // console.log($('.yfrtbx a').attr('href').trim());
    // console.log($('#ncard0').first().text().trim());
    // console.log($('.green-box').first().text().trim())
    // console.log($('.rt_count').first().text().trim())
    // console.log($('.distnctxt').first().text().trim())
    // Select all the list items in plainlist class

    // console.log($('.product-item-name').first().text().trim());
    // console.log($('[data-price-type=finalPrice]').first().text().trim());


}
// Invoke the above function
scrapeData()