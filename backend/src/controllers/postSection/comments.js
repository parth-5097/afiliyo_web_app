const connection = require("../../database/connect");
const { SQL, PAGINATION } = require("../../config");

// put middleware to identify comment id and to check for parent_id
// GIF on hold

exports.makeComment = (req, res) => {
  var date = new Date();
  connection.query(
    `INSERT INTO ${SQL.tables.comments} SET ?`,
    req.values,
    (error, insert) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        connection.query(
          `SELECT msg,timestamp FROM ${SQL.tables.comments} WHERE id=${insert.insertId}`,
          (error, data) => {
            if (error || data.length === 0) {
              res.json({
                success: false,
                message: "Comment not found",
              });
            } else {
              let reqDate = new Date(data[0].timestamp);
              let response = {
                username: req.user.username,
                comment: data[0].msg,
                reqMadeTime: this.convertTime(
                  (date.getTime() - reqDate.getTime()) / 1000
                ),
              };
              connection.query(
                `SELECT t2.profile_pic_img FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id WHERE t1.id=${req.user.id};UPDATE ${SQL.tables.post} SET commentPost = commentPost + 1 WHERE id=${req.values.post_id}`,
                (error, data) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Internal server error",
                    });
                  } else {
                    data[0].length > 0
                      ? (response.profile_pic = data[0][0].profile_pic_img)
                      : null;
                    res.json({
                      success: true,
                      data: response,
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
};

exports.viewComments = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.*,t2.username,t3.profile_pic_img,IF((SELECT id FROM ${SQL.tables.likeComments} WHERE comment_id=t1.id AND user_id=${req.user.id}),TRUE,FALSE) AS isLiked FROM ${SQL.tables.comments} t1 INNER JOIN ${SQL.tables.users} t2 ON t2.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t3 ON t3.id=t2.profile_id WHERE t1.post_id=${req.body.post_id} AND t1.parent_id IS NULL ORDER BY t1.timestamp DESC LIMIT ? OFFSET ?`,
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
          message: "Data not found",
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

exports.getCommentReply = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.*,t2.username,t3.profile_pic_img,IF((SELECT id FROM ${SQL.tables.likeComments} WHERE comment_id=t1.id AND user_id=${req.user.id}),TRUE,FALSE) AS isLiked FROM ${SQL.tables.comments} t1 INNER JOIN ${SQL.tables.users} t2 ON t2.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t3 ON t3.id=t2.profile_id WHERE t1.parent_id=${req.params.id} ORDER BY t1.timestamp DESC LIMIT ? OFFSET ?`,
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
          message: "Data not found",
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

exports.likeComment = (req, res) => {
  let commentId = req.body.commentId;

  connection.query(
    `SELECT likes FROM ${SQL.tables.comments} WHERE id=${commentId}; SELECT id FROM ${SQL.tables.likeComments} WHERE comment_id=${commentId} AND user_id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data[1][0]) {
        res.json({
          success: true,
          message: "Liked",
        });
      } else {
        let likes = data[0][0].likes + 1;
        let value = {
          comment_id: commentId,
          user_id: req.user.id,
        };

        connection.query(
          `UPDATE ${SQL.tables.comments} SET likes=${likes} WHERE id=${commentId};INSERT IGNORE INTO ${SQL.tables.likeComments} SET ?`,
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
                message: "Liked",
              });
            }
          }
        );
      }
    }
  );
};

exports.blockPostComment = (req, res) => {
  console.log(req.params.id, req.user.id);
  connection.query(
    `UPDATE ${SQL.tables.post} SET isComment=1 WHERE id=${req.params.id} AND user_id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: 500,
          message: "Internal server error",
        });
      } else if (data.changedRows > 0) {
        res.json({
          success: true,
          message: "Blocked successfully",
        });
      } else {
        res.json({
          success: false,
          message: "You do not have permission to block this post comment",
        });
      }
    }
  );
};

exports.unblockPostComment = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.post} SET isComment=0 WHERE id=${req.params.id} AND user_id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: 500,
          message: "Internal server error",
        });
      } else if (data.changedRows > 0) {
        res.json({
          success: true,
          message: "Un Blocked successfully",
        });
      } else {
        res.json({
          success: false,
          message: "You do not have permission to block this post comment",
        });
      }
    }
  );
};

exports.convertTime = (labelValue) => {
  let number =
    Number(labelValue) < 60
      ? "just now"
      : Number(labelValue) >= 3.154e7
      ? Number(labelValue) / 3.154e7 + "y ago"
      : Number(labelValue) >= 86400
      ? Number(labelValue) / 86400 + "d ago"
      : Number(labelValue) >= 3600
      ? Number(labelValue) / 3600 + "h ago"
      : Number(labelValue) >= 60
      ? Number(labelValue) / 60 + "m ago"
      : Number(labelValue);
  return Math.floor(number);
};
