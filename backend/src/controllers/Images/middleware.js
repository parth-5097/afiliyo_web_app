const fs = require("fs");
const rimraf = require("rimraf");
const connection = require("../../database/connect");
const { SQL, IMG } = require("../../config");
const { randomFixedInteger } = require("../extraController");

exports.matchUrl = (req, res, next) => {
  connection.query(
    `SELECT url,img FROM ${SQL.tables.transactional.scrapping} WHERE url="${req.body.url}"`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        next();
      } else {
        res.json({
          success: true,
          data: JSON.parse(data[0].img),
        });
      }
    }
  );
};

exports.checkType = (req, res, next) => {
  let type = req.query.type;

  let image = {
    pathDir: "/upload_images/",
  };

  if (type == "post" || type == "item") {
    image.type = type;
    image.path = `${type}/`;
    image.db_column = "images";
    if (type == "post") {
      image.db_name = SQL.tables.post;
      req.image = image;
      next();
    } else if (type == "item") {
      image.db_name = SQL.tables.items;
      req.image = image;
      next();
    }
  } else {
    res.json({
      success: false,
      message: "Please provide type of image like post,item etc",
    });
  }
};

exports.moveFile = (source, dest) => {
  let path = "/upload_images/transactional_scrapp/";
  let result = [];

  return new Promise((resolve, reject) => {
    fs.readdir(`${source}/img/`, (err, file) => {
      if (!err && file.length > 0) {
        file.forEach(async (el) => {
          let newName = randomFixedInteger(12) + "_" + el;
          let url = path + newName;
          fs.renameSync(`${source}/img/${el}`, `${dest}${newName}`);
          if (url.match("join-life-cacktus-big_1024") === null) {
            result.push(url);
          }
        });
        resolve(result);
      } else if (err) {
        return reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.scrappFromHtml = (fileUrl) => {
  let result = [];
  let urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return new Promise((resolve, reject) => {
    fs.readFile(fileUrl, "utf-8", (err, data) => {
      if (!err) {
        data.match(urlRegex).forEach((e) => {
          if (e.match(".jpg") || e.match(".jpeg")) {
            e.endsWith("&quot")
              ? result.push(e.replace("&quot", ""))
              : result.push(e);
          }
        });
        resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

// exports.removeDir = (req, res) => {
//   let path = {
//     p1: `public/upload_images/scrappedImage/`,
//   };
//   let err = false;
//   connection.query(
//     `SELECT url,img FROM ${SQL.tables.transactional.scrapping} WHERE TIME_TO_SEC(TIMEDIFF(NOW(),timestamp)) / 60 > 730`,
//     (error, data) => {
//       let length = data.length;
//       if (!error && data.length > 0) {
//         rimraf(path.p1, (error) => {
//           if (!error) {
//             for (let i = 0; i < data.length; i++) {
//               if (err === true) {
//                 res.send(false);
//               } else if (i == length - 1) {
//                 res.send(true);
//               } else {
//                 connection.query(
//                   `DELETE FROM ${SQL.tables.transactional.scrapping} WHERE url="${data[i].url}"`,
//                   (error) => {
//                     if (!error) {
//                       this.removePerticularImage(data[i].img)
//                         .then((data) => {
//                           if (i == length - 1) {
//                             res.send(true);
//                           }
//                         })
//                         .catch((error) => {
//                           err = true;
//                         });
//                     } else {
//                       err = true;
//                     }
//                   }
//                 );
//               }
//             }
//           } else {
//             err = true;
//             console.log(error);
//             res.send(false);
//           }
//         });
//       } else {
//         res.send(true);
//       }
//     }
//   );
// };

exports.removePerticularImage = (image) => {
  let img = image.split(" ");
  return new Promise((resolve, reject) => {
    for (let i = 0; i < img.length; i++) {
      fs.unlink(`public${img[i]}`, (err) => {
        return reject(err);
      });
      if (i == img.length - 1) {
        resolve(true);
      }
    }
  });
};
