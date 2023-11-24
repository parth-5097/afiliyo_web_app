const { SQL, PAGINATION } = require("../../config");
const express = require("express");
const connection = require("../../database/connect");

exports.setOffset = (req, res, next) => {
  let discData = [
    {
      id: 1,
      title: "Trending Post",
      subTitle: "Trending Post",
      offset: 0,
      limit: 10,
      records: [],
    },
    {
      id: 2,
      title: "Local Trending Post",
      subTitle: "Local Trending Post",
      offset: 0,
      limit: 10,
      records: [],
    },
  ];
  let body = req.body;
  try {
    Object.keys(body).forEach((e) => {
      discData.filter((data) => {
        if (data.id == e) return (data.offset = body[e].offset);
      });
    });
    req.discData = discData;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Check your ids",
    });
  }
};

/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-26 13:04:49
 * @modify date 2021-02-26 13:04:49
 * @desc [Added dynamic time on dicovery api]
 */

exports.discovery = (req, res) => {
  //NOTE: enable this after socket implementation is done
  let time =
    express.static.activeUser == undefined
      ? 60
      : express.static.activeUser < 100
      ? 30
      : express.static.activeUser < 5000
      ? 15
      : express.static.activeUser < 20000
      ? 5
      : 1;

  let discData = req.discData;
  connection.query(
    `SELECT t3.name,t3.username,t2.*,t4.profile_pic_img,t5.isLiked FROM ${SQL.tables.postDataHistory} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t2.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id LEFT JOIN ${SQL.tables.likePost} t5 ON t5.post_id=t1.id WHERE t1.timestamp >= NOW() - INTERVAL ${time} DAY GROUP BY t2.id HAVING COUNT(t2.id) > 1 ORDER BY ((t2.likes-t1.likes)+(t2.commentPost-t1.commentPost)+(t2.share-t1.share))/3 DESC LIMIT ? OFFSET ?;
    SELECT t3.name,t3.username,t2.*,t4.profile_pic_img,t5.isLiked FROM ${SQL.tables.postDataHistory} t1 INNER JOIN ${SQL.tables.post} t2 ON t2.id=t1.id INNER JOIN ${SQL.tables.users} t3 ON t3.id=t2.user_id INNER JOIN ${SQL.tables.profiles} t4 ON t4.id=t3.profile_id LEFT JOIN ${SQL.tables.likePost} t5 ON t5.post_id=t1.id WHERE t2.region="${req.params.region}" AND t1.timestamp >= NOW() - INTERVAL ${time} DAY GROUP BY t2.id HAVING COUNT(t2.id) > 1 ORDER BY ((t2.likes-t1.likes)+(t2.commentPost-t1.commentPost)+(t2.share-t1.share))/3 DESC LIMIT ? OFFSET ?`,
    [
      discData[0].limit,
      discData[0].offset,
      discData[1].limit,
      discData[1].offset,
    ],
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
        discData[0].records = data[0];
        discData[1].records = data[1];
        res.json({
          success: true,
          data: discData,
        });
      }
    }
  );
};

exports.filter = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  let val;
  Object.keys(req.body).forEach((e) => {
    if (e === "price") {
      val = val
        ? val + " AND " + `t1.${e}` + " BETWEEN " + req.body.price
        : val;
    } else if (e === "gender") {
      val = val
        ? val + " AND " + `t1.${e}="${req.body[e]}"`
        : `t1.${e}="${req.body[e]}"`;
    } else {
      val = val
        ? val + " AND " + `FIND_IN_SET(t1.${e},"${req.body[e]}")`
        : `FIND_IN_SET(t1.${e},"${req.body[e]}")`;
    }
  });

  connection.query(
    `SELECT t2.name,t2.username,t1.*,t3.profile_pic_img,t4.isLiked,IF((SELECT FIND_IN_SET(t1.id,post_id) FROM ${SQL.tables.users} WHERE id="${req.user.id}"),TRUE,FALSE) AS isSaved FROM ${SQL.tables.post} t1 INNER JOIN ${SQL.tables.users} t2 ON t1.user_id=t2.id INNER JOIN ${SQL.tables.profiles} t3 ON t2.profile_id=t3.id LEFT JOIN ${SQL.tables.likePost} t4 ON t4.post_id=t1.id AND t4.user_id=${req.user.id} WHERE t1.id IN (SELECT IF(FIND_IN_SET(t1.id, t2.item_id), t2.id, "Not found") AS result FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.post} t2 WHERE ${val}) GROUP BY t1.id LIMIT ? OFFSET ?`,
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
          message: "No item found",
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
