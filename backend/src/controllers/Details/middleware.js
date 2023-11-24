const { SQL } = require("../../config");
const connection = require("../../database/connect");
const { uploadCBCSImages } = require("../extraController");

exports.checkForImage = (req, res, next) => {
  let image = req.files;

  if (image) {
    uploadCBCSImages(req.route.path, image.img)
      .then((data) => {
        req.imageUrl = data;
        next();
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err,
          message: "Error while uploading image",
        });
      });
  } else {
    req.imageUrl = `/upload_images${req.route.path}/default.png`;
    next();
  }
};

exports.findSuggestedUser = (users, username) => {
  let result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < users.length; i++) {
      connection.query(
        `SELECT * FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id INNER JOIN ${SQL.tables.follow} t3 ON t3.main_user=t1.username WHERE (FIND_IN_SET("${users[i].username}",t3.following_user) OR FIND_IN_SET("${users[i].username}",t3.follower_user)) AND t1.username="${users[i].username}" AND t1.username!="${username}"`,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            result.push(data[0]);
            if (i == users.length - 1) {
              resolve(result);
            }
          }
        }
      );
    }
  });
};

exports.checkForAdminOfBrand = (req, res, next) => {
  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE id=${req.user.id} AND role_id=1`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0) {
        req.user.isAdmin = 0;
        req.body.commission = 0;
        next();
      } else {
        req.user.isAdmin = 1;
        req.body.commission
          ? next()
          : res.json({
              success: false,
              message: "Provide commision rate for this brand",
            });
      }
    }
  );
};
