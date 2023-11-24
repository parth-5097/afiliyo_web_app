const connection = require("../../database/connect");
const { randomFixedInteger } = require("../extraController");
const { SQL, IMG } = require("../../config");

exports.uploadedImages = (req, res) => {
  var file = req.files.file;
  var userId = req.user.id;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "video/mp4"
  ) {
    const img_name = randomFixedInteger(12) + "_" + file.name;
    let path = req.image.pathDir + req.image.path;
    let db_values = {
      user_id: userId,
      path: path,
      img_name: img_name,
    };

    connection.query(
      `INSERT INTO ${SQL.tables.transactional.image} SET ?`,
      db_values,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          connection.query(
            `SELECT t2.id,t2.images FROM ${SQL.tables.users} t1 INNER JOIN ${req.image.db_name} t2 ON t1.${req.image.type}_id=t2.id WHERE t1.id="${userId}"`,
            (error, data) => {
              if (error || data.length === 0) {
                res.json({
                  success: false,
                  message: `${req.image.type} not found, First add your ${req.image.type}`,
                });
              } else {
                let value = data[0].images;
                let newValue = value + "," + db_values.id;

                connection.query(
                  `UPDATE ${
                    req.image.db_name
                  } SET images="${newValue.removeDuplicate()}" WHERE id="${
                    data[0].id
                  }"`,
                  (error) => {
                    if (error) {
                      res.json({
                        success: false,
                        message: "Internal server error",
                      });
                    } else {
                      file.mv(`public/${path}` + img_name, (error) => {
                        if (error) {
                          res.json({
                            success: false,
                            message: "Check your type",
                          });
                        } else {
                          res.json({
                            success: true,
                            message: "Uploaded",
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "This file type is not allowed",
    });
  }
};

exports.fetchImages = (req, res) => {
  userId = req.user.id;
  let newPath = `${req.image.pathDir}/${req.image.type}/`;

  connection.query(
    `SELECT t2.images FROM ${SQL.tables.users} t1 INNER JOIN ${req.image.db_name} t2 ON t1.${req.image.type}_id=t2.id WHERE t1.id="${userId}"`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "Images not found",
        });
      } else {
        let values = data[0].images.split(",");
        let result = [];
        for (let i in values) {
          connection.query(
            `SELECT * FROM ${SQL.tables.transactional.post} WHERE id="${values[i]}"`,
            (error, data) => {
              if (!error && data.length > 0) {
                let newValue = data[0].path + data[0].img_name;
                result.push(newValue);
                if (result.length === values.length) {
                  res.json({
                    success: true,
                    path: newPath,
                    images: result,
                  });
                }
              } else {
                result.push("");
              }
            }
          );
        }
      }
    }
  );
};

String.prototype.removeDuplicate = function () {
  const set = new Set(this.split(","));
  return [...set].join(",");
};
