const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

const gsDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

exports.getDaysArray = (s, e) => {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push({
      x: new Date(d).toISOString().split("T")[0],
      y: 0,
    });
  }
  return a;
};

exports.getAnalytics = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT * FROM ${SQL.tables.postDataHistory} WHERE DATE(timestamp) > '2021-04-14' LIMIT ? OFFSET ?; SELECT * FROM ${SQL.tables.itemDataHistory} WHERE DATE(timestamp) > '2021-04-14' LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset), parseInt(limit), parseInt(offset)],
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
};

exports.overviewAnalytics = (req, res) => {
  connection.query(
    `SELECT DATE(timestamp) AS x,COUNT(f_id) AS y FROM ${SQL.tables.follower} WHERE user_id=${req.user.id} AND timestamp >= DATE(NOW()) - INTERVAL ${req.query.follower} DAY GROUP BY DATE(timestamp);
    SELECT DATE(timestamp) AS x,COUNT(profile_id) AS y FROM ${SQL.tables.profile_visit} WHERE user_id=${req.user.id} AND timestamp >= DATE(NOW()) - INTERVAL ${req.query.profile} DAY GROUP BY DATE(timestamp);
    SELECT DATE(t1.timestamp) AS x,COUNT(t1.post_id) AS y FROM ${SQL.tables.reachPost} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.post_id WHERE t1.user_id=${req.user.id} AND t2.image REGEXP '.mp4$|.mov$|.wmv$|.avi$|.avchd$|.mkv$|.webM' AND t1.timestamp >= DATE(NOW()) - INTERVAL ${req.query.video} DAY GROUP BY DATE(t1.timestamp)`,
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
          message: "No records for this time line",
        });
      } else {
        res.json({
          success: true,
          data: {
            follower: this.getDaysArray(
              new Date(
                new Date().setDate(new Date().getDate() - req.query.follower)
              ),
              new Date()
            ).map((val) => {
              let x = data[0].find(
                (el) => new Date(el.x).toISOString().split("T")[0] == val.x
              );
              val.x = gsDayNames[new Date(val.x).getDay()];
              val.y = x ? x.y : val.y;
              return val;
            }),
            follower_count: data[0].reduce((sum, val) => {
              return sum + Number(val.y);
            }, 0),
            profile: this.getDaysArray(
              new Date(
                new Date().setDate(new Date().getDate() - req.query.profile)
              ),
              new Date()
            ).map((val) => {
              let x = data[1].find(
                (el) => new Date(el.x).toISOString().split("T")[0] == val.x
              );
              val.x = gsDayNames[new Date(val.x).getDay()];
              val.y = x ? x.y : val.y;
              return val;
            }),
            profile_count: data[1].reduce((sum, val) => {
              return sum + Number(val.y);
            }, 0),
            video: this.getDaysArray(
              new Date(
                new Date().setDate(new Date().getDate() - req.query.video)
              ),
              new Date()
            ).map((val) => {
              let x = data[2].find(
                (el) => new Date(el.x).toISOString().split("T")[0] == val.x
              );
              val.x = gsDayNames[new Date(val.x).getDay()];
              val.y = x ? x.y : val.y;
              return val;
            }),
            video_count: data[2].reduce((sum, val) => {
              return sum + Number(val.y);
            }, 0),
          },
        });
      }
    }
  );
};

exports.videoPostcontent = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} WHERE t1.user_id=${req.user.id} AND t1.image REGEXP '.mp4$|.mov$|.wmv$|.avi$|.avchd$|.mkv$|.webM' ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
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

exports.videoTrendingVideo = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t3.name,t3.username,t2.*,t4.profile_pic_img,t5.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved FROM ${SQL.tables.postDataHistory} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t2.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id LEFT JOIN ${SQL.tables.likePost} t5 ON t5.post_id=t1.id WHERE t1.user_id=${req.user.id} AND t2.image REGEXP '.mp4$|.mov$|.wmv$|.avi$|.avchd$|.mkv$|.webM' GROUP BY t2.id HAVING COUNT(t2.id) > 1 ORDER BY ((t2.likes-t1.likes)+(t2.commentPost-t1.commentPost)+(t2.share-t1.share))/3 DESC LIMIT ? OFFSET ?`,
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

exports.perticularVideoPostContent = (req, res) => {
  connection.query(
    `SELECT id,image,share,likes,share,savePost AS save,commentPost AS comment,created_at FROM ${SQL.tables.post} WHERE id=${req.params.id} AND image REGEXP '.mp4$|.mov$|.wmv$|.avi$|.avchd$|.mkv$|.webM';
    SELECT COUNT(user_id) AS total_views FROM ${SQL.tables.reachPost} WHERE post_id=${req.params.id} AND user_id=${req.user.id};
    SELECT COUNT(f_id) AS for_you FROM ${SQL.tables.following} WHERE user_id=${req.user.id};
    SELECT COUNT(f_id) AS follow FROM ${SQL.tables.follower} WHERE user_id=${req.user.id};
    SELECT COUNT(profile_id) AS personal_profile FROM ${SQL.tables.profile_visit} WHERE user_id=${req.user.id}`,
    (error, data) => {
      if (error) {
        console.log(error);
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
          data: {
            postData: data[0][0],
            total_views: data[1][0].total_views,
            for_you: data[2][0].for_you,
            follow: data[3][0].follow,
            personal_profile: data[4][0].personal_profile,
          },
        });
      }
    }
  );
};

exports.followersContentAnalytics = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT COUNT(t1.f_id) AS followers,COUNT(IF(LOWER(t2.gender)='male',t2.gender,NULL)) AS gender_male,COUNT(IF(LOWER(t2.gender)='female',t2.gender,NULL)) AS gender_female FROM ${SQL.tables.follower} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id WHERE t1.user_id=${req.user.id};
    SELECT t2.region,COUNT(t2.id) AS region_follower FROM ${SQL.tables.follower} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id WHERE t1.user_id=${req.user.id} GROUP BY t2.region;
    SELECT DATE(timestamp) AS x,COUNT(f_id) AS y FROM ${SQL.tables.follower} WHERE user_id=${req.user.id} AND timestamp >= DATE(NOW()) - INTERVAL ${req.query.follower} DAY GROUP BY DATE(timestamp)`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (
        data[0].length == 0 &&
        data[1].length == 0 &&
        data[2].length == 0
      ) {
        res.json({
          success: false,
          message: "No data found",
        });
      } else {
        res.json({
          success: true,
          data: {
            follower_count:
              data[0].length > 0 ? data[0][0].followers : data[0][0],
            gender_male:
              data[0].length > 0
                ? (data[0][0].gender_male /
                    (data[0][0].gender_male - -data[0][0].gender_female)) *
                  100
                : data[0][0],
            gender_female:
              data[0].length > 0
                ? (data[0][0].gender_female /
                    (data[0][0].gender_male - -data[0][0].gender_female)) *
                  100
                : data[0][0],
            terretories: data[1],
            follower:
              data[2].length > 0
                ? this.getDaysArray(
                    new Date(
                      new Date().setDate(
                        new Date().getDate() - req.query.follower
                      )
                    ),
                    new Date()
                  ).map((val) => {
                    let x = data[2].find(
                      (el) =>
                        new Date(el.x).toISOString().split("T")[0] == val.x
                    );
                    val.x = gsDayNames[new Date(val.x).getDay()];
                    val.y = x ? x.y : val.y;
                    return val;
                  })
                : [],
            follower_count:
              data[2].length > 0
                ? data[2].reduce((sum, val) => {
                    return sum + Number(val.y);
                  }, 0)
                : 0,
          },
        });
      }
    }
  );
};

exports.dateWiseUIPCount = (req, res) => {
  connection.query(
    `SELECT DATE(created_at) AS x,COUNT(id) AS y FROM ${SQL.tables.post} WHERE created_at >= DATE(NOW()) - INTERVAL ${req.params.day} DAY GROUP BY DATE(created_at);
    SELECT DATE(created_at) AS x,COUNT(id) AS y FROM ${SQL.tables.items} WHERE created_at >= DATE(NOW()) - INTERVAL ${req.params.day} DAY GROUP BY DATE(created_at);
    SELECT DATE(created_at) AS x,COUNT(id) AS y FROM ${SQL.tables.users} WHERE created_at >= DATE(NOW()) - INTERVAL ${req.params.day} DAY GROUP BY DATE(created_at)`,
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
          message: "No records found",
        });
      } else {
        res.json({
          success: true,
          post: data[0],
          item: data[1],
          user: data[2],
        });
      }
    }
  );
};

exports.genderWiseDifferenceInUIP = (req, res) => {
  connection.query(
    `SELECT COUNT(DISTINCT id) gender,COUNT(DISTINCT CASE WHEN gender = 'male' THEN id END) male,COUNT(DISTINCT CASE WHEN gender = 'female' THEN id END) female FROM ${SQL.tables.items};
    SELECT COUNT(DISTINCT id) gender,COUNT(DISTINCT CASE WHEN LOWER(gender) = 'male' THEN id END) male,COUNT(DISTINCT CASE WHEN LOWER(gender) = 'female' THEN id END) female FROM ${SQL.tables.users};
    SELECT region,COUNT(id) AS region_user FROM ${SQL.tables.users} GROUP BY region`,
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
          message: "No records found",
        });
      } else {
        data[0][0].not_specified =
          data[0][0].gender + -data[0][0].male + -data[0][0].female;
        data[1][0].not_specified =
          data[1][0].gender + -data[1][0].male + -data[1][0].female;
        res.json({
          success: true,
          itemGender: data[0][0],
          userGender: data[1][0],
          regionUser: data[2],
        });
      }
    }
  );
};
