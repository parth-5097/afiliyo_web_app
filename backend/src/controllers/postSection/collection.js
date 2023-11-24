const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.addCollection = (req, res) => {
  let value = req.body;
  value.user_id = req.user.id;

  connection.query(
    `INSERT INTO ${SQL.tables.collection} SET ?`,
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
          data: value,
        });
      }
    }
  );
};

exports.getCollection = (req, res) => {
  if (req.query.name) {
    connection.query(
      `SELECT t5.col_name,t5.data,t2.name,t2.username,t1.id,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id="${req.user.id}"),TRUE,FALSE) AS isSaved FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id INNER JOIN ${SQL.tables.collection} t5 LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id="${req.user.id}" WHERE FIND_IN_SET(t1.id,t5.data) AND t5.col_name="${req.query.name}" AND t5.user_id="${req.user.id}" GROUP BY t1.id`,
      (error, data) => {
        if (error) {
          console.log(error);
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          res.json({
            success: false,
            message: "No records found or check your given ids",
          });
        } else {
          res.json({
            success: true,
            data: data.reduce((obj, item) => {
              obj[item.col_name] = {
                image: obj[item.col_name]
                  ? obj[item.col_name].image + "," + item.image
                  : item.image,
                post_ids: obj[item.col_name]
                  ? obj[item.col_name].post_ids + "," + item.data
                  : item.data,
              };

              return obj;
            }, {}),
          });
        }
      }
    );
  } else {
    connection.query(
      `SELECT t1.id AS post_id,t1.image,t2.col_name,t2.data FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.collection} t2 WHERE FIND_IN_SET(t1.id,t2.data) AND t2.user_id="${req.user.id}" GROUP BY t1.id`,
      (error, data) => {
        if (error) {
          console.log(error);
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          res.json({
            success: false,
            message: "No records found",
          });
        } else {
          res.json({
            success: true,
            data: data.reduce((obj, item) => {
              obj[item.col_name] = {
                image: obj[item.col_name]
                  ? obj[item.col_name].image + "," + item.image
                  : item.image,
                post_ids: obj[item.col_name]
                  ? obj[item.col_name].post_ids + "," + item.data
                  : item.data,
              };

              return obj;
            }, {}),
          });
        }
      }
    );
  }
};

exports.updateCollection = (req, res) => {
  let value = req.body;

  connection.query(
    `UPDATE ${SQL.tables.collection} SET ? WHERE user_id="${req.user.id}" AND col_name="${value.col_name}"`,
    value,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Check your collection name",
        });
      } else {
        //SELECT data FROM ${SQL.tables.collection} WHERE user_id="${req.user.id}" AND col_name="${value.col_name}"
        connection.query(
          `SELECT t5.col_name,t5.data,t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id="${req.user.id}"),TRUE,FALSE) AS isSaved FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id="${req.user.id}" INNER JOIN ${SQL.tables.collection} t5 ON t5.user_id="${req.user.id}" AND t5.col_name="${value.col_name}" WHERE FIND_IN_SET(t1.id,t5.data) GROUP BY t1.id`,
          (error, data) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else if (data.length === 0) {
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
      }
    }
  );
};

exports.deleteCollection = (req, res) => {
  let value = req.body;
  if (value.data) {
    connection.query(
      `SELECT data FROM ${SQL.tables.collection} WHERE FIND_IN_SET("${value.data}",data) AND user_id="${req.user.id}" AND col_name="${value.col_name}"`,
      (error, data) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          res.json({
            success: true,
            message: "Deleted",
          });
        } else {
          data[0].data = removeValue(data[0].data, value.data, ",");
          connection.query(
            `UPDATE ${SQL.tables.collection} SET data=? WHERE user_id="${req.user.id}" AND col_name="${value.col_name}"`,
            data[0].data,
            (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                res.json({
                  success: true,
                  message: "Deleted",
                });
              }
            }
          );
        }
      }
    );
  } else {
    connection.query(
      `DELETE FROM ${SQL.tables.collection} WHERE user_id="${req.user.id}" AND col_name="${value.col_name}"`,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          res.json({
            success: true,
            message: "Deleted",
          });
        }
      }
    );
  }
};

var removeValue = function (list, value, separator) {
  separator = separator || ",";
  var values = list.split(separator);
  for (var i = 0; i < values.length; i++) {
    if (values[i] == value) {
      values.splice(i, 1);
      return values.join(separator);
    }
  }
  return list;
};
