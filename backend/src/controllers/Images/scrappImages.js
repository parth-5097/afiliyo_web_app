const scrape = require("website-scraper");
const PhantomPlugin = require("website-scraper-phantom");
const PuppeteerPlugin = require("website-scraper-puppeteer");
const SaveToExistingDirectoryPlugin = require("website-scraper-existing-directory");
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const { IMG, SQL } = require("../../config");
const { moveFile, scrappFromHtml } = require("./middleware");
const connection = require("../../database/connect");

//NOTE: ADVANCE SCRAPPING
// tor-browser-implementation --> args: ['--proxy-server=socks5://127.0.0.1:9050']
exports.latestScrapImage = (req, res) => {
  let source = `public/upload_images/scrappedImage/${req.user.id}`;
  let dest = `public/upload_images/transactional_scrapp/`;
  let url = req.body.url ? req.body.url : "http://localhost:4200/profile";
  url = url.replace(new RegExp("(http|https)://[a-z]+."), function (c) {
    return `${c.split(":")[0]}://www.`;
  });
  //"--proxy-server=socks5://127.0.0.1:9050"
  const options = {
    urls: [url],
    directory: source,
    subdirectories: [{ directory: "img", extensions: [".jpg", ".jpeg"] }],
    sources: [
      { selector: "img", attr: "src" },
      { selector: 'link[rel="stylesheet"]', attr: "href" },
      { selector: "script", attr: "src" },
      { selector: "video", attr: "poster" },
    ],
    plugins: [
      new PuppeteerPlugin({
        launchOptions: {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sendbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
          ],
        },
      }),
      new SaveToExistingDirectoryPlugin(),
    ],
  };

  connection.query(
    `SELECT url,img FROM ${SQL.tables.transactional.scrapping} WHERE url="${url}"`,
    (error, data) => {
      if (error || data.length === 0) {
        scrape(options)
          .then(() => {
            if (
              url.match("www.myntra") === null &&
              url.match("www.calvinklein") === null
            ) {
              moveFile(source, dest)
                .then((data) => {
                  let payload = {
                    url: url,
                    img: data.join(" "),
                  };
                  if (data.length > 0) {
                    connection.query(
                      `INSERT INTO ${SQL.tables.transactional.scrapping} SET ?`,
                      payload,
                      (error) => {
                        if (error) {
                          res.json({
                            success: false,
                            message: "Internal server error",
                          });
                        } else {
                          res.json({
                            success: true,
                            data: data,
                          });
                        }
                      }
                    );
                  } else {
                    fs.writeFileSync(
                      `${__dirname}/list_of_url.txt`,
                      `${url}\n`,
                      { flag: "a+" }
                    );
                    res.json({
                      success: true,
                      data: data,
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    success: false,
                    message: "Internal server error",
                  });
                });
            } else {
              scrappFromHtml(`public/upload_images/scrappedImage/index.html`)
                .then((data) => {
                  let payload = {
                    url: url,
                    img: data.join(" "),
                  };
                  connection.query(
                    `INSERT INTO ${SQL.tables.transactional.scrapping} SET ?`,
                    payload,
                    (error) => {
                      if (error) {
                        res.json({
                          success: false,
                          message: "Internal server error",
                        });
                      } else {
                        res.json({
                          success: true,
                          data: data,
                        });
                      }
                    }
                  );
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    success: false,
                    message: "Failed to scrap Images",
                  });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({
              success: false,
              message: "Failed to scrap Images",
            });
          });
      } else {
        data[0].img = data[0].img.split(" ");
        res.json({
          success: true,
          data: data[0].img,
        });
      }
    }
  );
};

//NOTE: BASIC SCRAPPING
exports.scrapImages = (req, res) => {
  let url = req.body.url ? req.body.url : "http://localhost:4200/profile";
  let result = [];

  request(url, (error, data, html) => {
    if (!error) {
      var $ = cheerio.load(html);

      $("img").each((e) => {
        let src = $("img")[e].attribs["src"];
        if (src) {
          if (
            src.match("/png") ||
            src.match(".png") ||
            src.match("/jpeg") ||
            src.match(".jpeg") ||
            src.match("/jpg") ||
            src.match(".jpg")
          ) {
            if (src.match("base64")) {
              var block = src.split(";");
              var realData = block[1].split(",")[1];
              result.push(realData);
            } else {
              result.push(src);
            }
          }
        }
      });
      res.json({
        success: true,
        data: result,
      });
    } else {
      res.json({
        success: false,
        error: error,
        message: "Check your url",
      });
    }
  });
};

// download({
//   imgs: [{ url: imagesrc }],
//   dest: "E:/afiliyo-web-app/backend/public/upload_images/scrappedImage",
// })
//   .then((data) => {
//     console.log(data);
//     res.json({
//       success: true,
//       message: "Image scrapped, now you can get by making get req",
//     });
//   })
//   .catch((error) => {
//     res.json({
//       success: false,
//       error: error,
//       message: "Internal Server Error",
//     });
//   });

// fs.watch(
//   "E:/afiliyo-web-app/backend/public/upload_images/transactional_scrapp",
//   (event, file) => {
//     if (event == "rename") {
//       exec("curl http://localhost:5000/", (error, stdout, stderr) => {
//         console.log(error, stderr, stdout);
//       });
//     }
//   }
// );
