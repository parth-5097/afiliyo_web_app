const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.review = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.profiles} SET ? WHERE id=${req.user.p_id}`,
    req.reviewData,
    (error) => {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          data: req.reviewData,
        });
      }
    }
  );
};

exports.follow = (req, res) => {
  if (req.user.id !== req.user.user_id) {
    connection.query(
      `SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id="${req.user.user_id}"`,
      (error, data) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          connection.query(
            `INSERT INTO ${SQL.tables.following} (user_id,f_id) VALUES("${req.user.id}","${req.user.user_id}");INSERT INTO ${SQL.tables.follower} (user_id,f_id) VALUES("${req.user.user_id}","${req.user.id}")`,
            (error) => {
              if (error) {
                console.log(error);
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                res.json({
                  success: true,
                  message: "Followed successfully",
                });
              }
            }
          );
        } else {
          res.json({
            success: true,
            message: "Followed successfully",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "You can't follow yourself",
    });
  }
};

exports.unfollow = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.following} WHERE f_id=${req.user.user_id} AND user_id=${req.user.id};DELETE FROM ${SQL.tables.follower} WHERE f_id=${req.user.id} AND user_id=${req.user.user_id}`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          message: "unfollow",
        });
      }
    }
  );
};

exports.getFollowerList = (req, res) => {
  connection.query(
    `SELECT t1.id AS user_id, t1.username, t1.name, t2.profile_pic_img, IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id IN (SELECT f_id FROM ${SQL.tables.follower} WHERE user_id=${req.user.id})`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "You did not follow anyone yet",
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

exports.getFollowingList = (req, res) => {
  connection.query(
    `SELECT t1.id AS user_id, t1.username, t1.name, t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id IN (SELECT f_id FROM ${SQL.tables.following} WHERE user_id=${req.user.id})`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "You did not follow anyone yet",
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

String.prototype.removeDuplicate = function () {
  const set = new Set(this.split(","));
  return [...set].join(",");
};
