const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const chalk = require("chalk");
const connection = require("../../database/connect");
const { SQL } = require("../../config");

const error = chalk.bold.red;
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
/**
   * This is to use IP rotation with tor but I have found different workaround with puppeteer itself
let min = 9052,
  max = 9080;
   * `--proxy-server=socks5://127.0.0.1:${
          Math.floor(Math.random() * (max - min + 1)) + min
        }` */

exports.scrappProduct = async (req, res) => {
  let url;
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      defaultViewport: {
        width: 1280,
        height: 882,
      },
      args: [
        "--netifs-to-ignore=INTERFACE_TO_IGNORE",
        "--disable-canvas-aa",
        "--disable-2d-canvas-clip-aa",
        "--window-size=1280,1024",
        "--no-zygote",
        "--use-gl=swiftshader",
        "--enable-webgl",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-first-run",
        "--disable-infobars",
        "--disable-breakpad",
        "--no-sandbox",
        "--disable-setuid-sendbox",
        "--disable-gl-drawing-for-tests",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    url = req.body.url ? req.body.url : "http://localhost:4200/profile";
    url = url.replace(new RegExp("(http|https)://[a-z]+."), function (c) {
      return `${c.split(":")[0]}://www.`;
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    var xml = await page.content(),
      doc = new dom({
        locator: {},
        errorHandler: {
          warning: function (w) {},
          error: function (e) {},
          fatalError: function (e) {
            console.log(e);
          },
        },
      }).parseFromString(xml),
      title = xpath.select("//title", doc),
      img = xpath.select("//img", doc);

    var data = await page.evaluate((url) => {
      var dataArray = [];
      // if (url.match("www.myntra") !== null) {
      //   dataArray = {
      //     productName: Array.from(
      //       document.querySelectorAll("h1.pdp-name"),
      //       (e) => {
      //         return e.textContent.trim();
      //       }
      //     ),
      //     productPrice: Array.from(
      //       document.querySelectorAll("span.pdp-price > strong"),
      //       (e) => {
      //         return e.textContent.trim();
      //       }
      //     ),
      //     productImg: Array.from(
      //       document.querySelectorAll("div.image-grid-image"),
      //       (e) => {
      //         return JSON.stringify(e.style.backgroundImage).match(urlRegex)[0];
      //       }
      //     ),
      //   };
      // }
      // if (url.match("www.walmart") !== null) {
      //   dataArray = {
      //     productName: Array.from(
      //       document.querySelectorAll("h1.prod-ProductTitle"),
      //       (e) => {
      //         return e.textContent.trim();
      //       }
      //     ),
      //     productPrice: Array.from(
      //       document.querySelectorAll(
      //         "span.price--stylized > span.visuallyhidden"
      //       ),
      //       (e) => {
      //         return e.textContent.trim();
      //       }
      //     ),
      //   };
      // }
      if (url.match("www.zara") !== null) {
        dataArray = {
          productPrice: Array.from(
            document.querySelectorAll("span.price__amount"),
            (e) => {
              return e.textContent.trim();
            }
          ),
        };
      }
      if (url.match("www.snapdeal") !== null) {
        dataArray = {
          productPrice: Array.from(
            document.querySelectorAll("span.pdp-final-price"),
            (e) => {
              return e.textContent.trim();
            }
          ),
        };
      }
      if (url.match("www.amazon") !== null) {
        dataArray = {
          productPrice: Array.from(
            document.querySelectorAll("span#priceblock_ourprice"),
            (e) => {
              return e.textContent.trim();
            }
          ),
        };
      }
      if (url.match("www.flipkart") !== null) {
        dataArray = {
          productPrice: Array.from(
            document.querySelectorAll("div._30jeq3"),
            (e) => {
              return e.textContent.trim();
            }
          ),
        };
      }
      return dataArray;
    }, url);

    data.length == 0 ? (data.productPrice = []) : "";

    var dataArray = {
      productName: title[0].firstChild.data,
      productImage: img
        .toString()
        .match(
          /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
        )
        .filter(
          (e) =>
            e.match(".jpeg") ||
            e.match(".jpg") ||
            e.match(".JPG") ||
            e.match(".JPEG")
        ),
    };

    let value = {
      url: url,
      img: JSON.stringify({ ...dataArray, ...data }),
    };
    if ((dataArray.productImage && dataArray.productName) || value.img) {
      connection.query(
        `INSERT INTO ${SQL.tables.transactional.scrapping} SET ?`,
        value,
        (error) => {
          if (error) {
            res.json({
              success: false,
              message: "Internal server error",
            });
          } else {
            res.json({
              success: true,
              data: { ...dataArray, ...data },
            });
          }
        }
      );
    } else {
      res.json({
        success: false,
        message: "URL must be --> zara, amazon, flipkart, snapdeal",
      });
    }
  } catch (err) {
    console.log(error(err));
    res.json({
      success: false,
      error: err,
      message: "Internal server error",
    });
  } finally {
    if (browser) {
      browser.close();
    }
  }
};
