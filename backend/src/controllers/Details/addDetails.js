const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.addUserDetails = (req, res) => {
  let user_data = {
    name: req.body.name,
    gender: req.body.gender,
    username: req.body.username,
    dob: req.body.dob,
    interest: req.body.interest ? req.body.interest : null,
  };
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;

  if (email || phoneNumber) {
    connection.query(
      `SELECT email FROM ${SQL.tables.users} WHERE email='${email}' OR phoneNumber='${phoneNumber}'`,
      (error, data) => {
        if (error || data.length === 0) {
          res.json({
            success: false,
            message: "First signup with your mobile number and email",
          });
        } else {
          email = data[0].email;
          connection.query(
            `UPDATE ${SQL.tables.users} SET ? WHERE email = "${email}"`,
            user_data,
            (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "username is already taken",
                });
              } else {
                res.json({
                  success: true,
                  message: "Details updated",
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Email or phone number is require",
    });
  }
};

exports.addCategory = (req, res) => {
  let category = {
    name: req.body.name,
  };

  if (req.user.role === "admin") {
    category.img = req.imageUrl;
    connection.query(
      `INSERT INTO ${SQL.tables.category} SET ?`,
      category,
      (error) => {
        if (error) {
          res.json({
            success: false,
            error: error,
            message: "Already exists",
          });
        } else {
          res.json({
            success: true,
            message: "Table updated successfully",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Only admin can add category",
    });
  }
};

exports.addColor = (req, res) => {
  let color = {
    name: req.body.name,
  };

  if (req.user.role === "admin") {
    color.img = req.imageUrl;
    connection.query(
      `INSERT INTO ${SQL.tables.color} SET ?`,
      color,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Already exists",
          });
        } else {
          res.json({
            success: true,
            message: "Table updated successfully",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Only admin can add color",
    });
  }
};

exports.addBrand = (req, res) => {
  let brand = {
    name: req.body.name,
    url: req.body.url ? req.body.url : null,
  };

  brand.img = req.imageUrl;
  connection.query(
    `INSERT INTO ${SQL.tables.brand} SET ?`,
    brand,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Already exists",
        });
      } else {
        res.json({
          success: true,
          message: "Table updated successfully",
          brand_id: data.insertId,
        });
      }
    }
  );
};

exports.addSize = (req, res) => {
  let size = {
    name: req.body.name,
  };

  if (req.user.role === "admin") {
    size.img = req.imageUrl;
    connection.query(`INSERT INTO ${SQL.tables.size} SET ?`, size, (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Already exists",
        });
      } else {
        res.json({
          success: true,
          message: "Table updated successfully",
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Only admin can add size",
    });
  }
};

exports.addHashtag = (req, res) => {
  let hashtag = {
    name: req.body.name,
  };
  if (req.user.role === "admin") {
    connection.query(
      `INSERT INTO ${SQL.tables.hashtag} SET ?`,
      hashtag,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Already exists",
          });
        } else {
          res.json({
            success: true,
            message: "Table updated successfully",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Only admin can add hashtags",
    });
  }
};

exports.addPostImage = (req, res) => {
  let postImage = {
    file_name: req.body.file_name,
  };

  connection.query(
    `INSERT INTO ${SQL.tables.postImage} SET ?`,
    postImage,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Already exists",
        });
      } else {
        res.json({
          success: true,
          message: "Image set successfully",
        });
      }
    }
  );
};

exports.editUser = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.users} SET ? WHERE id=${req.params.id}`,
    req.body,
    (error, data) => {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        console.log(data);
        res.json({
          success: true,
          message: "Updated",
        });
      }
    }
  );
};

exports.editCategory = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `UPDATE ${SQL.tables.category} SET ? WHERE id=${req.params.id}`,
      req.body,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          res.json({
            success: true,
            message: "Edited successfully",
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

exports.editBrand = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `UPDATE ${SQL.tables.brand} SET ? WHERE id=${req.params.id}`,
      req.body,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          res.json({
            success: true,
            message: "Edited successfully",
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

exports.editSize = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `UPDATE ${SQL.tables.size} SET ? WHERE id=${req.params.id}`,
      req.body,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          res.json({
            success: true,
            message: "Edited successfully",
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

exports.editColor = (req, res) => {
  if (req.user.role == "admin") {
    connection.query(
      `UPDATE ${SQL.tables.color} SET ? WHERE id=${req.params.id}`,
      req.body,
      (error) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else {
          res.json({
            success: true,
            message: "Edited successfully",
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

exports.editBlackList = (req, res) => {
  connection.query(
    `UPDATE ${SQL.tables.transactional.token_blacklist} SET ? id=${req.params.id}`,
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
          message: "Updated",
        });
      }
    }
  );
};
