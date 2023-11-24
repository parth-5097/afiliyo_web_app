const connection = require("../../database/connect");
const { SQL, PAGINATION } = require("../../config");
const { uploadItemPostImage } = require("../extraController");
const { addPostHashTag } = require("./middleware");
const { notificationToOne } = require("../notification");

exports.addPost = (req, res) => {
  let post = req.body;
  let image = req.files;
  let items = post.items ? JSON.parse(post.items) : [];

  for (let i = 0; i < items.length; i++) {
    post.item_id = post.item_id
      ? post.item_id + "," + items[i].id
      : items[i].id;
  }
  if (image) {
    uploadItemPostImage(image, post.id, "post")
      .then((data) => {
        addPostHashTag(post.hashtag)
          .then((response) => {
            post.image = data.toString();
            post.user_id = req.user.id;
            post.item_id = items.length ? post.item_id : " ";
            post.items = items.length ? JSON.stringify(items) : " ";

            connection.query(
              `INSERT INTO ${SQL.tables.post} SET ?`,
              post,
              (error, data) => {
                if (error) {
                  console.log(error);
                  res.json({
                    success: false,
                    message: "Internal server error",
                  });
                } else {
                  connection.query(
                    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,
                                    IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,
                                    IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow 
                                    FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id 
                                    INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id 
                                    LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} 
                                    LEFT JOIN ${SQL.tables.items} t5 ON FIND_IN_SET(t5.id,t1.item_id) WHERE t1.id=${data.insertId} GROUP BY t1.id`,
                    (error, data) => {
                      if (error) {
                        res.json({
                          success: false,
                          message: "Internal server error",
                        });
                      } else {
                        res.json({
                          success: true,
                          message: "Successfully posted",
                          data: data,
                        });
                      }
                    }
                  );
                }
              }
            );
          })
          .catch((err) => {
            res.json({
              success: false,
              message: "Internal server error",
            });
          });
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err,
          message: "Error while uploading image",
        });
      });
  } else {
    res.json({
      success: false,
      message: "Select atleast one image",
    });
  }
};

/*SELECT t1.id FROM ${SQL.tables.post} t1 LEFT JOIN ${SQL.tables.items} t2 ON FIND_IN_SET(t2.id,t1.item_id) WHERE t2.category_id REGEXP CONCAT('(^|,)(', REPLACE('3,4,5', ',', '|'), ')(,|$)') GROUP BY t1.id*/
exports.getPost = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;
  let interest = req.user.interest
    ? `,t5.category_id REGEXP CONCAT('(^|,)(', REPLACE('${req.user.interest}', ',', '|'), ')(,|$)')`
    : "";

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,
      IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,
      IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow 
      FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} LEFT JOIN ${SQL.tables.items} t5 ON FIND_IN_SET(t5.id,t1.item_id)
      GROUP BY t1.id ORDER BY t1.created_at DESC${interest} LIMIT ? OFFSET ?`,
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

exports.getPeticularPost = (req, res) => {
  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,
  IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,
  IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow 
  FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id 
  INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id 
  LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} 
  LEFT JOIN ${SQL.tables.items} t5 ON FIND_IN_SET(t5.id,t1.item_id) WHERE t1.id=${req.params.id} GROUP BY t1.id
  `,
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
          message: "No post found check your id",
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

exports.getFollowingPost = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;
  let interest = req.user.interest
    ? `,t5.category_id REGEXP CONCAT('(^|,)(', REPLACE('${req.user.interest}', ',', '|'), ')(,|$)')`
    : "";

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,
    IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,
    IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow 
    FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} LEFT JOIN ${SQL.tables.items} t5 ON FIND_IN_SET(t5.id,t1.item_id)
    WHERE t1.user_id IN (SELECT f_id FROM ${SQL.tables.following} WHERE user_id=${req.user.id}) GROUP BY t1.id ORDER BY t1.created_at DESC${interest} LIMIT ? OFFSET ?`,
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

exports.getPopularPost = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;
  let temp =
    req.params.region === "ALL" ? "" : `WHERE t1.region="${req.params.region}"`;
  let interest = req.user
    ? req.user.interest
      ? `,t5.category_id REGEXP CONCAT('(^|,)(', REPLACE('${req.user.interest}', ',', '|'), ')(,|$)')`
      : ""
    : "";

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${
      SQL.tables.users
    } WHERE id=${
      req.user ? req.user.id : 0
    }),TRUE,FALSE) AS isSaved,IF((SELECT f_id FROM ${
      SQL.tables.following
    } WHERE user_id IN(${
      req.user ? req.user.id : 0
    }) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${
      SQL.tables.post
    } t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${
      SQL.tables.profiles
    } t3 ON t2.profile_id=t3.id LEFT JOIN ${
      SQL.tables.likePost
    } t4 ON t4.post_id=t1.id AND t4.user_id=${
      req.user ? req.user.id : 0
    } LEFT JOIN ${
      SQL.tables.items
    } t5 ON FIND_IN_SET(t5.id,t1.item_id) ${temp} GROUP BY t1.id ORDER BY t1.likes DESC${interest} LIMIT ? OFFSET ?`,
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
          message: "No posts found, try changing your region",
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

exports.getLikedPost = (req, res) => {
  let id = req.query.id ? req.query.id : req.user.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id WHERE t4.user_id=${id} AND t4.isLiked=1 ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
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

exports.getUserPost = (req, res) => {
  let user_id = req.query.id ? req.query.id : req.user.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} WHERE t1.user_id=${user_id} ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
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

exports.getUserSavePost = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} WHERE FIND_IN_SET(t1.id,(SELECT post_id FROM ${SQL.tables.users} WHERE id=${req.user.id})) ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
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

exports.getUserSharePost = (req, res) => {
  let user_id = req.query.id ? req.query.id : req.user.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT DISTINCT t2.image FROM ${SQL.tables.sharePost} t1 INNER JOIN ${SQL.tables.post} t2 ON t1.post_id=t2.id WHERE t1.user_id=${user_id} ORDER BY t2.created_at DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
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

exports.getRegionPost = (req, res) => {
  let region = req.query.val ? req.query.val : "IN";
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} WHERE t1.region="${region}" ORDER BY t1.created_at DESC LIMIT ? OFFSET ?`,
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

exports.likePost = (req, res) => {
  let post_id = req.body.post_id;

  connection.query(
    `SELECT t1.likes,t2.fcm_token FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id WHERE t1.id=${post_id}`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "No posts found",
        });
      } else {
        let other_fcm = data[0].fcm_token;
        console.log(other_fcm);
        connection.query(
          `SELECT isLiked FROM ${SQL.tables.likePost} WHERE post_id=${post_id} AND user_id=${req.user.id}`,
          (error, response) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else if (response.length === 0) {
              let value = {
                post_id: post_id,
                user_id: req.user.id,
                isLiked: true,
              };
              connection.query(
                `INSERT INTO ${SQL.tables.likePost} SET ? `,
                value,
                (error) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Internal server error",
                    });
                  } else {
                    data[0].likes = data[0].likes + 1;
                    connection.query(
                      `UPDATE ${SQL.tables.post} SET likes=? WHERE id=${post_id}`,
                      data[0].likes,
                      (error) => {
                        if (error) {
                          res.json({
                            success: false,
                            message: "Internal server error",
                          });
                        } else {
                          notificationToOne(other_fcm, {
                            notification: {
                              title: "Afilio",
                              data: `${req.user.id} Liked your post`,
                              imageUrl:
                                "http://13.127.164.220:3000/upload_images/profile/903956272930_2.PNG",
                            },
                          })
                            .then((response) => {
                              res.json({
                                success: true,
                                isLiked: value.isLiked,
                              });
                            })
                            .catch((error) => {
                              res.json({
                                success: true,
                                isLiked: value.isLiked,
                              });
                            });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              data[0].likes = response[0].isLiked
                ? data[0].likes - 1
                : data[0].likes + 1;
              response[0].isLiked = response[0].isLiked ? false : true;
              connection.query(
                `UPDATE ${SQL.tables.post} SET likes=? WHERE id=${post_id}`,
                data[0].likes,
                (error) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Internal server error",
                    });
                  } else {
                    connection.query(
                      `UPDATE ${SQL.tables.likePost} SET isLiked=? WHERE post_id=${post_id} AND user_id=${req.user.id}`,
                      response[0].isLiked,
                      (error) => {
                        if (error) {
                          res.json({
                            success: false,
                            message: "Internal server error",
                          });
                        } else {
                          notificationToOne(other_fcm, {
                            notification: {
                              title: "Afilio",
                              data: `${req.user.id} Liked your post`,
                              imageUrl:
                                "http://13.127.164.220:3000/upload_images/profile/903956272930_2.PNG",
                            },
                          })
                            .then((response) => {
                              res.json({
                                success: true,
                                isLiked: response[0].isLiked,
                              });
                            })
                            .catch((error) => {
                              res.json({
                                success: true,
                                isLiked: response[0].isLiked,
                              });
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
      }
    }
  );
};

exports.savePost = (req, res) => {
  let post_id = req.body.post_id;

  connection.query(
    `SELECT post_id FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          error: error,
          message: "No record found",
        });
      } else if (data[0].post_id) {
        data[0].post_id = data[0].post_id
          ? data[0].post_id + "," + post_id
          : post_id;
        data[0].post_id = data[0].post_id.removeDuplicate();
        connection.query(
          `UPDATE ${SQL.tables.users} SET post_id=? WHERE id=${req.user.id}`,
          data[0].post_id,
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              connection.query(
                `UPDATE ${SQL.tables.post} SET savePost=savePost+1 WHERE id=${post_id}`,
                (error) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Internal server error",
                    });
                  } else {
                    res.json({
                      success: true,
                      message: "Post saved successfully",
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        connection.query(
          `UPDATE ${SQL.tables.users} SET post_id=? WHERE id=${req.user.id}`,
          post_id,
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              res.json({
                success: true,
                message: "Post saved successfully",
              });
            }
          }
        );
      }
    }
  );
};

exports.sharePost = (req, res) => {
  let value = {
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  };

  if (req.user.id !== value.user_id) {
    connection.query(
      `SELECT share FROM ${SQL.tables.post} WHERE id=${value.post_id}`,
      (error, data) => {
        if (error || data.length === 0) {
          res.json({
            success: false,
            message: "No record found, check your post_id and user_id",
          });
        } else {
          connection.query(
            `INSERT IGNORE INTO ${SQL.tables.sharePost} SET ?`,
            value,
            (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                data[0].share += 1;
                connection.query(
                  `UPDATE ${SQL.tables.post} SET share=? WHERE id=${data[0].id}`,
                  data[0].share,
                  (error) => {
                    if (error) {
                      res.json({
                        success: false,
                        message: "Internal server error",
                      });
                    } else {
                      res.json({
                        success: true,
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
  } else {
    res.json({
      success: false,
      message: "Trying to share it with yourself ???????????",
    });
  }
};

exports.getAllBrandForTag = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.brand}`, (error, data) => {
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
  });
};

exports.postInsight = (req, res) => {
  connection.query(
    `SELECT t1.id AS post_id,t1.reach,t1.impression,t3.visit,(SELECT SUM(t2.clicks) FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.items} t2 ON FIND_IN_SET(t2.id,t1.item_id) WHERE t1.id=${req.params.id}) AS clicks FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id WHERE t1.id=${req.params.id} GROUP BY post_id`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "No record found",
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

exports.editPost = (req, res) => {
  let post = req.body;
  if (Object.keys(post).length > 0) {
    let items = post.items ? JSON.parse(post.items) : [];

    // I have done for loop here because there will be only 4 to 5 items max so it can not affect much on response time
    for (let i = 0; i < items.length; i++) {
      post.item_id = post.item_id
        ? post.item_id + "," + items[i].id
        : items[i].id;
    }
    connection.query(
      `UPDATE ${SQL.tables.post} SET ? WHERE id=${req.params.id}`,
      post,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Something went wrong",
          });
        } else {
          res.json({
            success: true,
            message: "Post updated successfully",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Atleast one field is require",
    });
  }
};

exports.deletePost = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.users} SET post_id = REGEXP_REPLACE(post_id, '(,(\s)?)?${req.params.id}', '');
    DELETE FROM ${SQL.tables.likePost} WHERE post_id=${req.params.id} AND user_id=${req.user.id};
    DELETE FROM ${SQL.tables.comments} WHERE post_id=${req.params.id};
    DELETE FROM ${SQL.tables.post} WHERE id=${req.params.id};
    DELETE FROM ${SQL.tables.postDataHistory} WHERE id=${req.params.id};
    DELETE FROM ${SQL.tables.sharePost} WHERE post_id=${req.params.id} AND user_id=${req.user.id};`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.json({
          success: true,
          message: "Deleted successfully",
        });
      }
    }
  );
};

exports.topPosts = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t3.name,t3.username,t2.*,t4.profile_pic_img,0 AS isLiked FROM ${SQL.tables.postDataHistory} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t2.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id WHERE t2.user_id=${req.user.id} AND t1.timestamp <= NOW() GROUP BY t2.id HAVING COUNT(t2.id) > 1 ORDER BY ((t2.likes-t1.likes)+(t2.commentPost-t1.commentPost)+(t2.share-t1.share))/3 DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
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

exports.getLikedPostUser = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.user_id,t2.name,t2.username,t3.profile_pic_img,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.likePost} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id WHERE t1.post_id=${req.params.id} AND t1.isLiked=TRUE LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "No records found for this post",
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

exports.getReachPostUser = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.user_id,t2.name,t2.username,t3.profile_pic_img,IF((SELECT f_id FROM ${SQL.tables.following} WHERE user_id IN(${req.user.id}) AND f_id IN (t1.user_id)),TRUE,FALSE) AS isFollow FROM ${SQL.tables.reachPost} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id WHERE t1.post_id=${req.params.id} LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "No records found for this post",
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
