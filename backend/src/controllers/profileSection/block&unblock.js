const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.block = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.profiles} SET block=IF(block != NULL,'${req.body.profile_id}',CONCAT(block,',','${req.body.profile_id}')) WHERE id IN (SELECT profile_id FROM ${SQL.tables.users} WHERE id=${req.user.id})`,
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
          message: "User blocked successfully",
        });
      }
    }
  );
};

exports.unblock = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.profiles} SET block = TRIM(BOTH ',' FROM REGEXP_REPLACE(block, '(,(\s)?)?${req.body.profile_id}', '')) WHERE id IN (SELECT profile_id FROM ${SQL.tables.users} WHERE id=${req.user.id})`,
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
          message: "User un blocked successfully",
        });
      }
    }
  );
};

exports.getBlockeduser = (req, res) => {
  connection.query(
    `SELECT t1.id AS user_id,t1.name,t1.username,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE FIND_IN_SET(t2.id,(SELECT t2.block FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id=${req.user.id}))`,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "You did not block anyone yet",
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
