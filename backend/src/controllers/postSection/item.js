const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");
const { uploadItemPostImage } = require("../extraController");
const { createItemShortLink } = require("./middleware");

exports.imageAddItems = (req, res) => {
  let item = req.body;
  let newItem = {};
  let image = req.files;
  newItem.user_id = req.user.id;
  newItem.name = item.name;
  newItem.brand_id = item.brand_id;
  newItem.description = item.description;
  newItem.price = "₹" + item.price;
  newItem.category_id = item.category_id;
  if (!image) {
    res.json({
      success: false,
      message: "Select images to upload",
    });
  } else {
    createItemShortLink(item.link)
      .then((newLink) => {
        newItem.link = newLink;
        uploadItemPostImage(image, newItem.id, "item")
          .then((data) => {
            newItem.image = data.toString();
            connection.query(
              `INSERT INTO ${SQL.tables.items} SET ?`,
              newItem,
              (error) => {
                if (error) {
                  res.json({
                    success: false,
                    error,
                    message: "Internal server error",
                  });
                } else {
                  res.json({
                    success: true,
                    message: "Item updated successfully",
                  });
                }
              }
            );
          })
          .catch((err) => {
            console.log(err);
            res.json({
              success: false,
              message: "Error while uploading image",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          success: false,
          message: "Error while creating short link",
        });
      });
  }
};

// exports.urlAddItems = (req, res) => {
//   let item = req.body;
// item.image = item.image.split("[")[1].split("]")[0];
// item.user_id = req.user.id;

//   changeImageUrlImage(item.image)
//     .then(() => {
//       item.image = item.image.split("/transactional_scrapp/").join("/item/");
//       connection.query(
//         `INSERT INTO ${SQL.tables.items} SET ?`,
//         item,
//         (error) => {
//           if (error) {
//             res.json({
//               success: false,
//               error,
//               message: "Internal server error",
//             });
//           } else {
//             res.json({
//               success: true,
//               message: "Item updated successfully",
//             });
//           }
//         }
//       );
//     })
//     .catch((error) => {
//       console.log(error);
//       res.json({
//         success: false,
//         message: "Internal server error",
//       });
//     });
// };

exports.urlAddItems = (req, res) => {
  let item = req.body;
  item.image = item.image.split("[")[1].split("]")[0];
  item.user_id = req.user.id;

  createItemShortLink(item.link)
    .then((newLink) => {
      item.link = newLink;
      connection.query(
        `INSERT INTO ${SQL.tables.items} SET ?`,
        item,
        (error) => {
          if (error) {
            res.json({
              success: false,
              error,
              message: "Internal server error",
            });
          } else {
            res.json({
              success: true,
              message: "Item updated successfully",
            });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: "Error while creating short link",
      });
    });
};

exports.getPostItems = (req, res) => {
  var post_id = req.query.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.name AS item_name,t1.description,t1.link,t1.price,t1.category_id,t3.name AS category_name,t3.img AS category_icon_img,t1.brand_id,t4.name AS brand_name,t4.img AS brand_icon_img,t1.color_id,t5.name AS color_name,t5.img AS color_icon_img,t1.size_id,t6.name AS size_name,t6.img AS size_icon_img, IF((SELECT FIND_IN_SET(t1.id,item_id) FROM ${SQL.tables.users} WHERE id=${req.user.id}),TRUE,FALSE) AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.post} t2 INNER JOIN ${SQL.tables.category} t3 ON t1.category_id=t3.id INNER JOIN ${SQL.tables.brand} t4 ON t1.brand_id=t4.id LEFT JOIN ${SQL.tables.color} t5 ON t1.color_id=t5.id LEFT JOIN ${SQL.tables.size} t6 ON t1.size_id=t6.id WHERE FIND_IN_SET(t1.id,t2.item_id) AND t2.id=${post_id} ORDER BY t1.updated_at LIMIT ? OFFSET ?`,
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
          message: "No items found",
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

exports.getItems = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t3.name AS category_name,t3.img AS category_icon_img,t1.brand_id,t4.name AS brand_name,t4.img AS brand_icon_img,t1.color_id,t5.name AS color_name,t5.img AS color_icon_img,t1.size_id,t6.name AS size_name,t6.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.post} t2 INNER JOIN ${SQL.tables.category} t3 ON t1.category_id=t3.id INNER JOIN ${SQL.tables.brand} t4 ON t1.brand_id=t4.id LEFT JOIN ${SQL.tables.color} t5 ON t1.color_id=t5.id LEFT JOIN ${SQL.tables.size} t6 ON t1.size_id=t6.id WHERE FIND_IN_SET(t1.id,t2.item_id) AND t2.user_id=${req.user.id} UNION 
    SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id ORDER BY updated_at LIMIT ? OFFSET ?`,
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
          message: "No items found",
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

exports.getBrandItems = (req, res) => {
  let brand_id = req.query.id;
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE t1.brand_id=${brand_id} ORDER BY t1.updated_at LIMIT ? OFFSET ?`,
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
          message: "No items found",
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

exports.getUserItems = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.post.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.post.limit;

  //SELECT t1.id,t1.image,t1.link,@item:=t1.name,t1.description,t1.price,@category:=t2.name,@catIcon:=t2.img,@brand:=t3.name,@brandIcon:=t3.img FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id WHERE t1.brand_id="${brand_id}" ORDER BY t1.updated_at LIMIT ? OFFSET ?
  connection.query(
    `SELECT item_id AS items FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "First save items",
        });
      } else {
        let items = data[0].items;
        connection.query(
          `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE FIND_IN_SET(t1.id, "${items}") ORDER BY t1.updated_at LIMIT ? OFFSET ?`,
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
                message: "No items found",
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

exports.getMyItems = (req, res) => {
  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE t1.user_id=${req.user.id} ORDER BY created_at`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "No items found",
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

exports.getSpecificItem = (req, res) => {
  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE t1.id=${req.params.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length == 0) {
        res.json({
          success: false,
          message: "No records found check your id",
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
        res.render("product/product", {
          item: data[0],
          image: data[0].image.split(","),
        });
      }
    }
  );
};

exports.getMatchItem = (req, res) => {
  let val;
  Object.keys(req.body).forEach((e) => {
    if (e == "categoryId") {
      val = val
        ? val + " AND " + `t2.id=${req.body[e]}`
        : `t2.id=${req.body[e]}`;
    } else if (e == "brandId") {
      val = val
        ? val + " AND " + `t3.id=${req.body[e]}`
        : `t3.id=${req.body[e]}`;
    } else if (e == "colorId") {
      val = val
        ? val + " AND " + `t4.id=${req.body[e]}`
        : `t4.id=${req.body[e]}`;
    } else if (e == "sizeId") {
      val = val
        ? val + " AND " + `t5.id=${req.body[e]}`
        : `t5.id=${req.body[e]}`;
    }
  });

  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE ${val}`,
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
          message: "No matching found",
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

exports.getSimilarItems = (req, res) => {
  let val;
  Object.keys(req.body).forEach((e) => {
    if (e == "gender") {
      val = val
        ? val + " OR " + `t1.${e}="${req.body[e]}"`
        : `t1.${e}="${req.body[e]}"`;
    } else if (e == "price") {
      val = val
        ? val +
          " OR " +
          `t1.${e}` +
          " BETWEEN " +
          `${req.body.price - +1000} AND ${req.body.price - -1000}`
        : `t1.${e}` +
          " BETWEEN " +
          `${req.body.price - +1000} AND ${req.body.price - -1000}`;
    } else if (e == "categoryId") {
      val = val
        ? val + " OR " + `t2.id=${req.body[e]}`
        : `t2.id=${req.body[e]}`;
    } else if (e == "brandId") {
      val = val
        ? val + " OR " + `t3.id=${req.body[e]}`
        : `t3.id=${req.body[e]}`;
    } else if (e == "colorId") {
      val = val
        ? val + " OR " + `t4.id=${req.body[e]}`
        : `t4.id=${req.body[e]}`;
    } else if (e == "sizeId") {
      val = val
        ? val + " OR " + `t5.id=${req.body[e]}`
        : `t5.id=${req.body[e]}`;
    }
  });

  connection.query(
    `SELECT t1.id AS item_id,t1.image,t1.gender,t1.link,t1.name AS item_name,t1.description,t1.price,t1.category_id,t2.name AS category_name,t2.img AS category_icon_img,t1.brand_id,t3.name AS brand_name,t3.img AS brand_icon_img,t1.color_id,t4.name AS color_name,t4.img AS color_icon_img,t1.size_id,t5.name AS size_name,t5.img AS size_icon_img,NULL AS isSaved,t1.updated_at FROM ${SQL.tables.items} t1 INNER JOIN ${SQL.tables.category} t2 ON t1.category_id=t2.id INNER JOIN ${SQL.tables.brand} t3 ON t1.brand_id=t3.id LEFT JOIN ${SQL.tables.color} t4 ON t1.color_id=t4.id LEFT JOIN ${SQL.tables.size} t5 ON t1.size_id=t5.id WHERE ${val}`,
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
          message: "No matching found",
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

exports.editItem = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.items} SET ? WHERE id=${req.params.id}`,
    req.body,
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
          message: "Edited succesfully",
        });
      }
    }
  );
};

exports.deleteItem = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.items} WHERE id=${req.params.id}`,
    (error) => {
      if (error) {
        res.json({
          success: true,
          message: "Internal server error",
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
