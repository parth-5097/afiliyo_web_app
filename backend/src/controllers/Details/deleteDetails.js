const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.deleteSaveItem = (req, res) => {
  let item_id = req.body.itemId;

  connection.query(
    `SELECT item_id FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "User not found",
        });
      } else {
        data[0].item_id = removeValue(data[0].item_id, item_id, ",");
        connection.query(
          `UPDATE ${SQL.tables.users} SET item_id=? WHERE id=${req.user.id}`,
          data[0].item_id,
          (error) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              res.json({
                success: true,
                message: "Item deleted successfully",
              });
            }
          }
        );
      }
    }
  );
};

exports.deleteSavepost = (req, res) => {
  let post_id = req.body.post_id;

  connection.query(
    `SELECT post_id FROM ${SQL.tables.users} WHERE FIND_IN_SET("${post_id}",post_id) AND id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length > 0) {
        data[0].post_id = removeValue(data[0].post_id, post_id, ",");
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
              res.json({
                success: true,
                message: "Post removed from your saved post",
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: "First save this post",
        });
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.users} WHERE id=${req.params.id}`,
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
          message: "Deleted",
        });
      }
    }
  );
};

exports.deleteCategory = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `DELETE FROM ${SQL.tables.category} WHERE id=${req.params.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
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
  } else {
    res.json({
      success: false,
      message: "Only admin can complete this action",
    });
  }
};

exports.deleteBrand = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `DELETE FROM ${SQL.tables.brand} WHERE id=${req.params.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
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
  } else {
    res.json({
      success: false,
      message: "Only admin can complete this action",
    });
  }
};

exports.deleteColor = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `DELETE FROM ${SQL.tables.color} WHERE id=${req.params.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
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
  } else {
    res.json({
      success: false,
      message: "Only admin can complete this action",
    });
  }
};

exports.deleteSize = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `DELETE FROM ${SQL.tables.size} WHERE id=${req.params.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
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
  } else {
    res.json({
      success: false,
      message: "Only admin can complete this action",
    });
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
