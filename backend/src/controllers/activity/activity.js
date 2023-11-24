const { SQL, SLANG_WORDS } = require("../../config");
const connection = require("../../database/connect");
const { sendSMS } = require("../extraController/mail_handler");
const { convertTime } = require("../postSection/comments");

exports.allActivity = (req, res) => {
  connection.query(
    `SELECT * FROM (SELECT 'Liked your post' as activity,t3.id AS user_id,t2.id AS post_id,t2.image,t3.username,t4.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.timestamp)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t3.id),TRUE,FALSE) AS isFollow,t1.timestamp FROM ${SQL.tables.likePost} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.post_id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t1.isLiked=TRUE AND t2.user_id="${req.user.id}" AND t1.user_id!="${req.user.id}" UNION ALL SELECT 'Commented on your post' as activity,t3.id AS user_id,t2.id AS post_id,t2.image,t3.username,t4.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.timestamp)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t3.id),TRUE,FALSE) AS isFollow, t1.timestamp FROM ${SQL.tables.comments} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.post_id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t2.user_id="${req.user.id}" AND t1.user_id!="${req.user.id}" GROUP BY t1.user_id HAVING COUNT(t1.user_id) > 1 UNION ALL SELECT 'You were mentioned' as activity,t2.id AS user_id,t1.id AS post_id,t1.image,t2.username,t3.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.created_at)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t2.id),TRUE,FALSE) AS isFollow, t1.created_at as timestamp FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t2.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t3 ON t3.id=t2.profile_id WHERE t1.user_id!="${req.user.id}" AND LOCATE("${req.user.username}",t1.tagBrand) UNION ALL SELECT 'Started following you' as activity,t1.id AS user_id, NULL as post_id, NULL as image,t1.username,t2.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t3.timestamp)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t1.id),TRUE,FALSE) AS isFollow, t3.timestamp FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id INNER JOIN ${SQL.tables.follower} t3 ON t1.id=t3.f_id WHERE t3.user_id="${req.user.id}") a ORDER BY timestamp DESC`,
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
          message: "No activity yet",
        });
      } else {
        res.json({
          success: true,
          data: data.map((el) => {
            el.timeDiff = convertTime(el.timeDiff);
            return el;
          }),
        });
      }
    }
  );
};

exports.allLikesActivity = (req, res) => {
  connection.query(
    `SELECT 'Liked your post' as activity,t3.id AS user_id,t2.id AS post_id,t2.image,t3.username,t4.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.timestamp)) AS timeDiff,t1.isLiked,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t3.id),TRUE,FALSE) AS isFollow FROM ${SQL.tables.likePost} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.post_id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t1.isLiked=TRUE AND t2.user_id="${req.user.id}" AND t1.user_id!="${req.user.id}" ORDER BY t1.timestamp DESC`,
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
          message:
            "If someone start to like your post then we will show it here",
        });
      } else {
        res.json({
          success: true,
          data: data.map((el) => {
            el.timeDiff = convertTime(el.timeDiff);
            return el;
          }),
        });
      }
    }
  );
};

exports.allCommentActivity = (req, res) => {
  connection.query(
    `SELECT 'Commented your post' as activity,t3.id AS user_id,t2.id AS post_id,t2.image,t3.username,t4.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.timestamp)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t3.id),TRUE,FALSE) AS isFollow FROM ${SQL.tables.comments} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.post_id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t2.user_id="${req.user.id}" AND t1.user_id!="${req.user.id}" GROUP BY t1.user_id HAVING COUNT(t1.user_id) > 1 ORDER BY t1.timestamp DESC`,
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
          message:
            "If someone start to comment on your post then we will show it here",
        });
      } else {
        res.json({
          success: true,
          data: data.map((el) => {
            el.timeDiff = convertTime(el.timeDiff);
            return el;
          }),
        });
      }
    }
  );
};

exports.allMentionActivity = (req, res) => {
  connection.query(
    `SELECT 'You were mentioned' as activity,t1.id AS post_id,t2.id AS user_id,t2.username,t3.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t1.created_at)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t2.id),TRUE,FALSE) AS isFollow FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t2.id=t1.user_id INNER JOIN ${SQL.tables.profiles} t3 ON t3.id=t2.profile_id WHERE t1.user_id!="${req.user.id}" AND LOCATE("${req.user.username}",t1.tagBrand) ORDER BY t1.created_at DESC`,
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
          message: "Currently, no one has mentioned you in their post",
        });
      } else {
        res.json({
          success: true,
          data: data.map((el) => {
            el.timeDiff = convertTime(el.timeDiff);
            return el;
          }),
        });
      }
    }
  );
};

exports.allFollowerActivity = (req, res) => {
  connection.query(
    `SELECT 'Started following you' as activity,t1.id AS user_id,t1.username,t2.profile_pic_img,TIME_TO_SEC(TIMEDIFF(NOW(),t3.timestamp)) AS timeDiff,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id="${req.user.id}" AND f_id=t1.id),TRUE,FALSE) AS isFollow FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.profiles} t2 ON t1.profile_id=t2.id INNER JOIN ${SQL.tables.follower} t3 ON t1.id=t3.f_id WHERE t3.user_id="${req.user.id}" ORDER BY t3.timestamp DESC`,
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
          message: "If someone start to follow you then we will show it here",
        });
      } else {
        res.json({
          success: true,
          data: data.map((el) => {
            el.timeDiff = convertTime(el.timeDiff);
            return el;
          }),
        });
      }
    }
  );
};

exports.inviteFriends = (req, res) => {
  sendSMS(req.body.phoneNumber, req.body.message)
    .then((data) => {
      res.json({
        success: true,
        message: "Invited",
      });
    })
    .catch((e) => {
      res.json({
        message: false,
        message: "Something went wrong, please try after some time",
      });
    });
};

exports.urlValidationForAdultWord = (req, res) => {
  let match = SLANG_WORDS;

  if (match.split(",").filter((el) => req.body.url.match(el)).length == 0) {
    res.json({
      success: true,
      valid: true,
    });
  } else {
    res.json({
      success: true,
      valid: false,
    });
  }
};
