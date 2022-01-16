const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware 
const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');
const request = require('request');
const { link } = require('fs');
const ejs = require("ejs");
const { AddressContext } = require('twilio/lib/rest/api/v2010/account/address');
const { getElementsByTagType } = require('domutils');

// var urlForSwiggy, urlForZomato;
// var extractLinksOfSwiggy, extractLinksOfZomato, matchedDishes = {};
// var matchedDishesForSwiggy, matchedDishesForZomato, tempAddress, discCodesForZomato, addr, linkOld = '';
// var z, s, w;
// var sdfd, tempurl, tempurl2;
// var Offers = 0;
app.set('view engine', 'ejs');
app.set('views', './');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var newItem;
// Route to Login Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

extractLinkFromGoogle = async(url) => {
    try {
        // Fetching HTML
        const { data } = await axios.get(url)

        // Using cheerio to extract <a> tags
        const $ = cheerio.load(data);

        rawUrl = $('.kCrYT>a').first().attr('href');
        url = rawUrl.split("/url?q=")[1].split("&")[0];
        console.log('Extracting url: ', url);

        return url;

    } catch (error) {
        // res.sendFile(__dirname + '/try.html');
        // res.sendFile(__dirname + '/error.html');
        console.log(error);
        return 0;
    }
};

app.post('/result', async(req, res) => {
    // Insert Login Code Here

    const final = []

    urlForPharmEasy = `https://google.com/search?q=PharmEasy+${req.body.foodItem}+order+online`;
    z = await extractLinkFromGoogle(urlForPharmEasy);

    extractDataOfPharmEasy = async(url) => {
        try {
            // Fetching HTML
            const { data } = await axios.get(url)

            // Using cheerio to extract <a> tags
            const $ = cheerio.load(data);
            var temp;
            // BreadCrumb_peBreadCrumb__2CyhJ
            $('.BreadCrumbLink_breadCrumb__LljfJ').map((i, elm) => {
                temp = $(elm).text();
            })
            var price = $('.PriceInfo_ourPrice__P1VR1').text();
            if (price == '') {
                price = $('.ProductPriceContainer_mrp__pX-2Q').text();
            }

            return {
                name: 'PharmEasy',
                item: temp,
                price: price,
            };
        } catch (error) {
            // res.sendFile(__dirname + '/try.html');
            // res.sendFile(__dirname + '/error.html');
            console.log(error);

            // console.log(error);
            return {};
        }
    };
    final.push(await extractDataOfPharmEasy(z));

    urlForNetMeds = `https://google.com/search?q=netmeds+${req.body.foodItem}+order+online`;
    z = await extractLinkFromGoogle(urlForNetMeds);

    extractDataOfNetMeds = async(url) => {
        try {
            // Fetching HTML
            const { data } = await axios.get(url)

            // Using cheerio to extract <a> tags
            const $ = cheerio.load(data);

            return {
                name: 'NetMeds',
                item: $('.product-detail').text(),
                price: $('.final-price').text(),
            };

        } catch (error) {
            // res.sendFile(__dirname + '/try.html');
            // res.sendFile(__dirname + '/error.html');
            console.log(error);
            return {};
        }
    };

    final.push(await extractDataOfNetMeds(z));

    urlForApollo = `https://google.com/search?q=Apollo+${req.body.foodItem}+order+online`;
    z = await extractLinkFromGoogle(urlForApollo);

    extractDataOfApollo = async(url) => {
        try {
            // Fetching HTML
            const { data } = await axios.get(url)

            // Using cheerio to extract <a> tags
            const $ = cheerio.load(data);

            return {
                name: 'Apollo',
                item: $('.PdpWeb_productDetails__3K6Dg').text(),
                // item: item,
                price: $('.MedicineInfoWeb_medicinePrice__ynSpV').text(),
            };

        } catch (error) {
            // res.sendFile(__dirname + '/try.html');
            // res.sendFile(__dirname + '/error.html');
            console.log(error);
            return {};
        }
    };
    final.push(await extractDataOfApollo(z));

    // urlForFlipcart = `https://google.com/search?q=flipkart+${req.body.foodItem}`;
    // z = await extractLinkFromGoogle(urlForFlipcart);

    // extractDataOfFlipcart = async(url) => {
    //     try {
    //         // Fetching HTML
    //         const { data } = await axios.get(url)
    //         console.log(data)

    //         // Using cheerio to extract <a> tags
    //         const $ = cheerio.load(data);

    //         return {
    //             name: 'Flipcart',
    //             item: $('.B_NuCI').text(),
    //             // item: item,
    //             price: $('._30jeq3').text(),
    //         };

    //     } catch (error) {
    //         // res.sendFile(__dirname + '/try.html');
    //         // res.sendFile(__dirname + '/error.html');
    //         console.log(error);
    //         return {};
    //     }
    // };

    // final.push(await extractDataOfFlipcart(z));

    urlForTata = `https://google.com/search?q=tata+1mg+${req.body.foodItem}+`;
    z = await extractLinkFromGoogle(urlForTata);

    extractDataOfTata = async(url) => {
        try {
            // Fetching HTML
            const { data } = await axios.get(url)

            // Using cheerio to extract <a> tags
            const $ = cheerio.load(data);

            return {
                name: 'Tata 1mg',
                item: $('.container-fluid-padded>h1').text() == "" ? $('style__pro-title___3zxNC').text() : $('.container-fluid-padded>h1').text() ,
                // item: item,
                // price: $('.DrugPriceBox__price___dj2lv').text(),
                price: $('.Price__price__22Jxo').text() == "" ? $('style__pack-size___254Cd').text() : $('.Price__price__22Jxo').text(),
            };

        } catch (error) {
            // res.sendFile(__dirname + '/try.html');
            // res.sendFile(__dirname + '/error.html');
            console.log(error);
            return {};
        }
    };

    final.push(await extractDataOfTata(z));

    console.log(final);
    res.render('index', { final: final });
    // if (z != '' && s != '') {
    //     const scrapeDishesForZomato = async(url, dish) => {
    //         const { data } = await axios.get(url)
    //         const $ = cheerio.load(data)
    //         toMatch = dish.toLowerCase()
    //         matchedDishes = {}

    //         //sc-jKVCRD
    //         final.push({ restaurantName: restaurant });
    //         // final.push({ area: area });
    //         final.push({ urlForZomato: z });
    //         final.push({ urlForSwiggy: s });
    //         // if (($('.iYoYyT').text()) == 'Closed') {
    //         //     Offers = 0;
    //         // } else if (($('.iYoYyT').text()) == 'Open now') {
    //         //     console.log("open!!");
    //         //     Offers = 1;
    //         // } else {
    //         //     Offers = 1;
    //         // }

    //         // if (Offers == 1) {
    //         console.log("Zomato Offers");

    //         try {
    //             $('.GyojG').map((i, elm) => {
    //                 final.push({
    //                     zomatoOffers: $(elm).text()
    //                 });
    //                 console.log($(elm).text());

    //             })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         // }

    //         $('[class^=sc-1s0saks-13]').each((_idx, el) => {
    //             item = $($('[class^=sc-1s0saks-15]', el)).text()
    //             price = $($('[class^=sc-17hyc2s-1]', el)).text()
    //                 // console.log('zomato ' + item + ' ' + price);

    //             if (item.toString().toLowerCase().includes(toMatch)) {
    //                 matchedDishes[item] = price
    //                 matchedDishes[item] = price;
    //             }
    //         })

    //         return matchedDishes;
    //     }

    //     const scrapeDishesForSwiggy = async(url, dish) => {
    //         const { data } = await axios.get(url)
    //         const $ = cheerio.load(data)
    //         toMatch = dish.toLowerCase()
    //         matchedDishes = {}
    //             //_3F2Nk

    //         // if (Offers == 1) {
    //         console.log("\nSwiggy Offers");
    //         $('.DM5zR').map((i, elm) => {
    //                 checkForOffer = $(elm).text();
    //                 // console.log(checkForOffer);
    //                 final.push({
    //                     swiggyOffers: $(elm).text()
    //                 }); //undefined   
    //             })
    //             // }

    //         $('[class^=styles_detailsContainer]').each((_idx, el) => {
    //             item = $($('[class^=styles_itemNameText]', el)).text()
    //             price = $($('[class^=styles_itemPortionContainer]', el)).text()

    //             if (item.toString().toLowerCase().includes(toMatch)) {
    //                 matchedDishes[item] = price
    //                 matchedDishes[item] = price;

    //             }
    //         })
    //         return matchedDishes;
    //     }

    //     showDishes = async() => {
    //         matchedDishesForZomato = await scrapeDishesForZomato(z, foodItem);
    //         matchedDishesForSwiggy = await scrapeDishesForSwiggy(s, foodItem);
    //         matchedDishes = {}


    //         for (const dishName in matchedDishesForZomato) {
    //             lowerDishName = dishName.toLowerCase().split(' ').sort().join(' ')
    //             if (matchedDishes[lowerDishName]) {
    //                 matchedDishes[lowerDishName]['Zomato'] = {
    //                     'dishName': dishName,
    //                     'price': matchedDishesForZomato[dishName].substring(1)
    //                 }
    //             } else {
    //                 matchedDishes[lowerDishName] = {
    //                     'Zomato': {
    //                         'dishName': dishName,
    //                         'price': matchedDishesForZomato[dishName].substring(1)
    //                     }
    //                 }
    //             }
    //         }

    //         for (const dishName in matchedDishesForSwiggy) {
    //             lowerDishName = dishName.toLowerCase().split(' ').sort().join(' ')
    //             if (matchedDishes[lowerDishName]) {
    //                 matchedDishes[lowerDishName]['Swiggy'] = {
    //                     'dishName': dishName,
    //                     'price': matchedDishesForSwiggy[dishName]
    //                 }
    //             } else {
    //                 matchedDishes[lowerDishName] = {
    //                     'Swiggy': {
    //                         'dishName': dishName,
    //                         'price': matchedDishesForSwiggy[dishName]
    //                     }
    //                 }
    //             }
    //         }

    //         for (const dishName in matchedDishes) {
    //             // console.log(dishName)
    //             final.push({
    //                 'dishName': matchedDishes[dishName]['Swiggy'] != undefined ? matchedDishes[dishName]['Swiggy']['dishName'] : matchedDishes[dishName]['Zomato']['dishName'],
    //                 'priceOnSwiggy': matchedDishes[dishName]['Swiggy'] == undefined ? 'N.A.' : matchedDishes[dishName]['Swiggy']['price'],
    //                 'priceOnZomato': matchedDishes[dishName]['Zomato'] == undefined ? 'N.A.' : matchedDishes[dishName]['Zomato']['price']
    //             });
    //         }

    //         console.log(final);
    //         if (final.length == 0) {
    //             console.log('The Item Is Not Available In The Restaurant !')
    //             res.send('The Item Is Not Available In The Restaurant !')
    //         } else {

    //             // res.send(final);

    //             res.render('index', { final: final });
    //         }
    //         final = [];
    //         // console.log(final);
    //         // for (var i = 0; i < 10; i++) {
    //         //     res.send(i);
    //         // }
    //     }
    //     await showDishes();
    // } else {
    //     // res.sendFile(__dirname + '/output.html');
    //     console.log('online delivery is not available in the restaurant');
    // }
});

const port = process.env.PORT || 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

// app.listen(port, () => console.log(`This app is listening on port ${port}`));
