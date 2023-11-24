const { SQL, SLANG_WORDS } = require("../../config");
const connection = require("../../database/connect");
const { randomFixedInteger } = require("../extraController");

exports.checkForUsername = (req, res, next) => {
  let username = req.body.username;

  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE username="${username}"`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "Check your username",
        });
      } else {
        req.user.user_id = data[0].id;
        next();
      }
    }
  );
};

exports.checkUsername = (req, res, next) => {
  connection.query(
    `SELECT username FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "user not found",
        });
      } else {
        req.user.username = data[0].username;
        next();
      }
    }
  );
};

exports.addProfileVisit = (req, res) => {
  connection.query(
    `SELECT * FROM ${SQL.tables.profile_visit} WHERE user_id=${req.user.id} AND profile_id=${req.profile.profile_id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0 && req.user.id !== req.profile.user_id) {
        connection.query(
          `INSERT INTO ${SQL.tables.profile_visit} SET ?;UPDATE ${SQL.tables.profiles} SET visit=visit+1 WHERE id=${req.profile.profile_id}`,
          {
            user_id: req.user.id,
            profile_id: req.profile.profile_id,
          },
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              res.json({
                success: true,
                data: req.profile,
              });
            }
          }
        );
      } else {
        res.json({
          success: true,
          data: req.profile,
        });
      }
    }
  );
};

// add later in get profile
exports.checkForUsername_2 = (req, res) => {
  let username = req.body.username;

  if (username) {
    connection.query(
      `SELECT username FROM ${SQL.tables.users} WHERE username="${username}"`,
      (error, data) => {
        if (error || data.length === 0) {
          res.json({
            success: false,
            message: "User not found",
          });
        } else {
          req.user.username = data[0].username;
          next();
        }
      }
    );
  } else {
    connection.query(
      `SELECT username FROM ${SQL.tables.users} WHERE email="${req.user.email}"`,
      (error, data) => {
        if (error || data.length === 0) {
          res.json({
            success: false,
            message: "User not found",
          });
        } else {
          req.user.username = data[0].username;
          next();
        }
      }
    );
  }
};

exports.checkForUploadImage = (req, res, next) => {
  let userId = req.user.id;
  let image = req.files;
  const path = "/upload_images/profile/";
  req.image = {};

  if (req.files) {
    req.files.end = "";
    connection.query(
      `SELECT t2.id,t2.background_img,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id=${userId}`,
      (error, data) => {
        if (error || data.length === 0) {
          if (image.background_img && image.profile_img) {
            req.image.background_img =
              randomFixedInteger(12) + "_" + req.files.background_img.name;
            req.image.profile_img =
              randomFixedInteger(12) + "_" + req.files.profile_img.name;
            req.image.back_path = path + req.image.background_img;
            req.image.profile_path = path + req.image.profile_img;
            next();
          } else {
            if (image.background_img) {
              req.image.background_img =
                randomFixedInteger(12) + "_" + req.files.background_img.name;
              req.image.profile_img = "";
              req.image.back_path = path + req.image.background_img;
              req.image.profile_path = path + req.image.profile_img;
              next();
            } else if (image.profile_img) {
              req.image.background_img = "";
              req.image.profile_img =
                randomFixedInteger(12) + "_" + req.files.profile_img.name;
              req.image.back_path = path + req.image.background_img;
              req.image.profile_path = path + req.image.profile_img;
              next();
            }
          }
        } else if (image.background_img && image.profile_img) {
          req.image.background_img =
            randomFixedInteger(12) + "_" + req.files.background_img.name;
          req.image.profile_img =
            randomFixedInteger(12) + "_" + req.files.profile_img.name;
          req.image.back_path = path + req.image.background_img;
          req.image.profile_path = path + req.image.profile_img;
          next();
        } else if (image.background_img) {
          req.image.background_img =
            randomFixedInteger(12) + "_" + req.files.background_img.name;
          req.image.profile_img = data[0].profile_pic_img;
          req.image.back_path = path + req.image.background_img;
          req.image.profile_path = req.image.profile_img;
          next();
        } else if (image.profile_img) {
          req.image.background_img = data[0].background_img;
          req.image.profile_img =
            randomFixedInteger(12) + "_" + req.files.profile_img.name;
          req.image.back_path = req.image.background_img;
          req.image.profile_path = path + req.image.profile_img;
          next();
        } else {
          res.json({
            success: false,
            message: "Internal server error",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Select image to upload",
    });
  }
};

exports.assignNewProfile = (req, res, next) => {
  connection.query(
    `SELECT profile_id FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "User not found",
        });
      } else {
        if (data[0].profile_id == null || data[0].profile_id == 1) {
          connection.query(
            `INSERT INTO ${SQL.tables.profiles} SET ?`,
            {
              bio: "",
              background_img: "",
              profile_pic_img: "",
              sh_instagram: "",
              sh_facebook: "",
              sh_tiktok: "",
              sh_twitter: "",
              sh_youtube: "",
              sh_website: "",
            },
            (error, data) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                connection.query(
                  `UPDATE ${SQL.tables.users} SET profile_id=${data.insertId} WHERE id=${req.user.id}`,
                  (error) => {
                    if (error) {
                      res.json({
                        success: false,
                        message: "Internal server error",
                      });
                    } else {
                      req.profile_id = data.insertId;
                      next();
                    }
                  }
                );
              }
            }
          );
        } else {
          req.profile_id = data[0].profile_id;
          next();
        }
      }
    }
  );
};

exports.checkReview = (req, res, next) => {
  connection.query(
    `SELECT id FROM ${SQL.tables.review} WHERE u_id=${req.body.user_id} AND p_id=${req.reviewData.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        let val = {
          p_id: req.reviewData.id,
          u_id: req.body.user_id,
        };
        connection.query(
          `INSERT IGNORE INTO ${SQL.tables.review} SET ?`,
          val,
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              req.reviewData.reviewSum += parseInt(req.body.review);
              req.reviewData.reviewCount += 1;
              req.reviewData.review =
                req.reviewData.reviewSum / req.reviewData.reviewCount;
              req.user.p_id = req.reviewData.id;
              delete req.reviewData.id;
              next();
            }
          }
        );
      } else {
        req.reviewData.reviewSum === 0
          ? (req.reviewData.reviewSum += parseInt(req.body.review))
          : (req.reviewData.reviewSum =
              req.reviewData.reviewSum +
              parseInt(req.body.review) -
              parseInt(req.reviewData.review));
        req.reviewData.review =
          req.reviewData.reviewSum / req.reviewData.reviewCount;
        req.user.p_id = req.reviewData.id;
        delete req.reviewData.id;
        next();
      }
    }
  );
};

exports.checkProfile = (req, res, next) => {
  if (req.user.id !== req.body.user_id) {
    connection.query(
      `SELECT t1.id,t1.review,t1.reviewSum,t1.reviewCount FROM ${SQL.tables.profiles} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.id=t2.profile_id WHERE t2.id=${req.body.user_id}`,
      (error, data) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          res.json({
            success: false,
            message: "First edit your profile",
          });
        } else {
          req.reviewData = data[0];
          next();
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Review user must be different",
    });
  }
};
