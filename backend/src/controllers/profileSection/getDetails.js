const connection = require("../../database/connect");
const { SQL } = require("../../config");

let blankResponse = {
  name: "",
  username: "",
  dob: "",
  id: "",
  review: 0.0,
  reviewCount: 0,
  checkFollow: 2,
  following: 0,
  follower: 0,
  bio: "",
  background_img: "",
  profile_pic_img: "",
  sh_instagram: "",
  sh_facebook: "",
  sh_tiktok: "",
  sh_twitter: "",
  sh_youtube: "",
  sh_website: "",
  refer_code: "",
  visit: 0,
};

exports.getProfile = (req, res, next) => {
  connection.query(
    `SELECT t1.name,t1.id AS user_id,t2.id AS profile_id,t1.username,t1.dob,t1.email,t1.phoneNumber,t2.review,t2.reviewCount,t2.bio,t2.background_img,t2.profile_pic_img,t2.sh_instagram,t2.sh_facebook,t2.sh_tiktok,t2.sh_twitter,t2.sh_youtube,t2.sh_website,t2.visit, t1.refer_code FROM ${
      SQL.tables.users
    } t1 INNER JOIN ${
      SQL.tables.profiles
    } t2 ON t1.profile_id=t2.id WHERE t1.username="${
      req.query.user ? req.query.user : req.user.username
    }"`,
    (error, response) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (response.length === 0) {
        res.json({
          success: true,
          data: blankResponse,
        });
      } else {
        connection.query(
          `SELECT COUNT(f_id) AS following,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id=${req.user.id} AND f_id=${response[0].user_id}),TRUE,FALSE) AS checkFollow FROM ${SQL.tables.following} WHERE user_id=${response[0].user_id};SELECT COUNT(f_id) AS follower FROM ${SQL.tables.follower} WHERE user_id=${response[0].user_id}`,
          (error, data) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              response[0].following = data[0][0].following;
              response[0].checkFollow = data[0][0].checkFollow;
              response[0].follower = data[1][0].follower;
              req.profile = response[0];
              next();
            }
          }
        );
      }
    }
  );
};

exports.getUserBlacklist = (req, res) => {
  connection.query(
    `SELECT id,user_id,false_attempt,block,timestamp FROM ${SQL.tables.transactional.token_blacklist}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "No records found",
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    }
  );
};

exports.convertBigValue = (labelValue) => {
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
    : Math.abs(Number(labelValue));
};
