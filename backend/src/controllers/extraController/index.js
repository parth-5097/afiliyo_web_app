const connection = require("../../database/connect");
const fs = require("fs");
const { SQL, IMG } = require("../../config");

exports.randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

exports.getID = (values, search_value, db_name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM ${db_name} WHERE ${search_value}="${values}"`,
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
};

exports.uploadItemPostImage = (image, id, dir) => {
  const path = `upload_images/${dir}/`;
  let result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < Object.keys(image).length; i++) {
      let newValue = {};
      let key = Object.keys(image)[i];
      image[key].name = this.randomFixedInteger(12) + "_" + image[key].name;
      newValue.user_id = id;
      newValue.path = "/" + path;
      newValue.img_name = image[key].name;

      if (dir === "item") {
        if (
          image[key].mimetype === "image/jpeg" ||
          image[key].mimetype === "image/jpg" ||
          image[key].mimetype === "image/png" ||
          image[key].mimetype === "application/octet-stream" ||
          image[key].mimetype === "image/webp"
        ) {
          result.push(newValue.path + newValue.img_name);
          connection.query(
            `INSERT IGNORE INTO ${SQL.tables.transactional.image} SET ?`,
            newValue,
            (error) => {
              if (error) {
                return reject(error);
              } else {
                image[key].mv(`public/${path}` + image[key].name, (error) => {
                  if (error) {
                    return reject(error);
                  } else {
                    if (Object.keys(image).length - 1 === i) {
                      resolve(result);
                    }
                  }
                });
              }
            }
          );
        } else {
          return reject("check your type");
        }
      } else if (dir === "post") {
        if (
          image[key].mimetype === "image/jpeg" ||
          image[key].mimetype === "image/jpg" ||
          image[key].mimetype === "image/png" ||
          image[key].mimetype === "video/mp4" ||
          image[key].mimetype === "video/mkv" ||
          image[key].mimetype === "application/octet-stream"
        ) {
          result.push(newValue.path + newValue.img_name);
          connection.query(
            `INSERT IGNORE INTO ${SQL.tables.transactional.image} SET ?`,
            newValue,
            (error) => {
              if (error) {
                return reject(error);
              } else {
                image[key].mv(`public/${path}` + image[key].name, (error) => {
                  if (error) {
                    return reject(error);
                  } else {
                    if (Object.keys(image).length - 1 === i) {
                      resolve(result);
                    }
                  }
                });
              }
            }
          );
        } else {
          return reject("check your type");
        }
      }
    }
  });
};

exports.uploadCBCSImages = (path, image) => {
  image.name = this.randomFixedInteger(12) + "_" + image.name;
  let defaultPath = `public/upload_images${path}/`;

  return new Promise((resolve, reject) => {
    image.mv(defaultPath + image.name, (error) => {
      if (error) {
        return reject(error);
      } else {
        let url = `/upload_images${path}/${image.name}`;
        resolve(url);
      }
    });
  });
};

exports.getItemPostImages = (image) => {
  let result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < image.length; i++) {
      connection.query(
        `SELECT * FROM ${SQL.tables.transactional.image} WHERE id="${image[i]}"`,
        (error, data) => {
          if (error || data.length === 0) {
            return reject(error);
          } else {
            let url = data[0].path + data[0].img_name;
            result.push(url);
            if (image.length - 1 === i) {
              resolve(result);
            }
          }
        }
      );
    }
  });
};

exports.changeImageUrlImage = (image) => {
  let url = image.split(",");
  return new Promise((resolve, reject) => {
    for (let i = 0; i < url.length; i++) {
      try {
        fs.copyFileSync(
          `public${url[i]}`,
          `public/upload_images/item/${
            url[i].split("/")[url[i].split("/").length - 1]
          }`
        );
        if (i == url.length - 1) {
          resolve();
        }
      } catch (e) {
        return reject(e);
      }
    }
  });
};

exports.interest = (req, res) => {
  connection.query(
    `INSERT INTO ${SQL.tables.interest}(user_id,interest) VALUES ("${req.user.id}", "${req.body.interest}") ON DUPLICATE KEY UPDATE interest="${req.body.interest}"`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
        });
      }
    }
  );
};
