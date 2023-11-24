const { SQL, PAGINATION, SLANG_WORDS } = require("../../config");
const connection = require("../../database/connect");

exports.searchCatPost = (req, res) => {
  let id = req.query.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.id AS user_id,t1.name,t1.username,t2.*,t3.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.post} t2 ON t1.id=t2.user_id INNER JOIN ${SQL.tables.profiles} t3 ON t1.profile_id=t3.id INNER JOIN ${SQL.tables.items} t4 ON FIND_IN_SET(t4.id,t2.item_id) WHERE t4.category_id=${id} ORDER BY t2.updated_at LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "No posts found",
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

exports.searchHashtagPost = (req, res) => {
  let val = req.query.val;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id="${req.user.id}" WHERE LOCATE("#${val}",t1.hashtag) ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
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
          message: "No posts found",
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

exports.searchHashTagRecords = (req, res) => {
  let value = req.query.val;
  connection.query(
    `SELECT name,countPost FROM ${SQL.tables.hashtag} WHERE LOCATE("#${value}",name)`,
    (error, data) => {
      if (error || data.length === 0) {
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
// NOTE: use below query to get suggested user from comma separated string
// SELECT CONCAT(GROUP_CONCAT(DISTINCT following_user SEPARATOR ', '),',',GROUP_CONCAT(DISTINCT follower_user SEPARATOR ', ')) as following_user FROM ${SQL.tables.follow} WHERE FIND_IN_SET(main_user,(SELECT CONCAT(following_user,',',follower_user) as following_user FROM ${SQL.tables.follow} WHERE main_user="${req.user.username}"))
exports.searchSuggestedUser = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;
  let value = req.query.val
    ? `AND LOCATE("${req.query.val}",t1.name) OR LOCATE("${req.query.val}",t1.username)`
    : ``;

  connection.query(
    `SELECT t1.id,t1.username,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id!=${req.user.id} AND t1.id IN (SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN (SELECT f_id FROM ${SQL.tables.following} WHERE user_id=${req.user.id} ORDER BY timestamp DESC)) LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        connection.query(
          `SELECT t1.id,t1.username,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id!=${req.user.id} ${value} ORDER BY t2.reviewCount AND t2.review DESC LIMIT ? OFFSET ?`,
          [parseInt(limit), parseInt(offset)],
          (error, data) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              res.json({
                success: true,
                data: data,
              });
            }
          }
        );
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    }
  );
};

exports.searchInfluencer = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.id AS user_id,t1.username,t1.name,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.role_id=2 LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: true,
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
};

exports.searchUserProfile = (req, res) => {
  let val = req.query.val;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  if (val) {
    connection.query(
      `SELECT t1.id,t1.username,t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE LOCATE("${val}",t1.username) LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)],
      (error, data) => {
        if (error) {
          res.json({
            success: true,
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
  } else {
    res.json({
      success: false,
      message: "Provide valid username",
    });
  }
};

exports.blockWords = (req, res, next) => {
  let match = SLANG_WORDS;

  if (
    match.search(req.query.val) >= 0 &&
    match.search(req.query.val) != 404 &&
    req.query.val
  ) {
    res.json({
      success: false,
      message: "This word is blocked",
    });
  } else {
    next();
  }
};
