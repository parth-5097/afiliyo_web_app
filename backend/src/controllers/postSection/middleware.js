const { nanoid } = require("nanoid");
const { SQL, URL } = require("../../config");
const connection = require("../../database/connect");

exports.setValues = (req, res, next) => {
  let comment = req.body;
  let values = {
    post_id: comment.post_id,
    user_id: req.user.id,
    msg: comment.msg,
  };

  connection.query(
    `SELECT id FROM ${SQL.tables.post} WHERE id=${values.post_id};SELECT username FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data[0].length === 0) {
        res.json({
          success: false,
          message: "Check your postID",
        });
      } else {
        req.user.username = data[1][0].username;
        comment.parent_id
          ? (values.parent_id = comment.parent_id)
          : (values.parent_id = null);
        req.values = values;
        next();
      }
    }
  );
};

exports.addPostHashTag = (tag) => {
  return new Promise((resolve, reject) => {
    let tags = tag.split("#");
    for (let i = 0; i < tags.length; i++) {
      connection.query(
        `INSERT IGNORE INTO ${SQL.tables.hashtag} SET name=?`,
        tags[i],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            connection.query(
              `UPDATE ${SQL.tables.hashtag} SET countPost=countPost+1 WHERE name="${tags[i]}"`,
              (error) => {
                if (error) {
                  return reject(error);
                }
              }
            );
          }
        }
      );
    }
    resolve();
  });
};

exports.updateFcmToken = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.users} SET fcm_token="${req.body.token}", loginStatus=FALSE WHERE id="${req.params.id}"`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          message: "Token updated successfully, please login again to continue",
        });
      }
    }
  );
};

exports.createItemShortLink = (link) => {
  return new Promise((resolve, reject) => {
    const sort_id = nanoid(10);
    connection.query(
      `INSERT INTO ${SQL.tables.transactional.sort_link} SET ? ON DUPLICATE KEY UPDATE sort_id=VALUES(sort_id)`,
      {
        sort_id: sort_id,
        link: link,
      },
      (error) => {
        if (error) {
          return reject(error);
        } else {
          resolve(sort_id);
        }
      }
    );
  });
};

exports.addPostUpdateHashTag = (req, res, next) => {
  if (req.body.hashtag) {
    this.addPostHashTag(req.body.hashtag)
      .then((data) => {
        next();
      })
      .catch((err) => {
        res.json({
          success: false,
          message: "Error while updating hashtag",
        });
      });
  } else {
    next();
  }
};

// exports.getItemName = (items) => {
//   let search = Object.keys(JSON.parse(items)).toString();
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT name FROM ${SQL.tables.items} WHERE FIND_IN_SET(id,'${search}')`,
//       (error, data) => {
//         if (error) {
//           return reject(error);
//         } else {
//           resolve(data);
//         }
//       }
//     );
//   });
// };
