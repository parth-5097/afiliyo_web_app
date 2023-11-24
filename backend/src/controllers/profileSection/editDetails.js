const connection = require("../../database/connect");
const { SQL, IMG } = require("../../config");

exports.editNamesProfile = (req, res, next) => {
  if (req.body.name) {
    connection.query(
      `UPDATE ${SQL.tables.users} SET name="${req.body.name}" WHERE id=${req.user.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
            error: error,
            message: "Internal server error",
          });
        } else {
          delete req.body.name;
          Object.keys(req.body).length == 0
            ? res.json({
                success: true,
                message: "Profile has been set successfully",
              })
            : next();
        }
      }
    );
  } else {
    next();
  }
};

exports.editUsernamesProfile = (req, res, next) => {
  if (req.body.username) {
    connection.query(
      `UPDATE ${SQL.tables.users} SET username="${req.body.username}" WHERE id=${req.user.id}`,
      (error) => {
        if (error) {
          res.json({
            success: false,
            error,
            message: "Internal server error",
          });
        } else {
          delete req.body.username;
          Object.keys(req.body).length == 0
            ? res.json({
                success: true,
                message: "Profile has been set successfully",
              })
            : next();
        }
      }
    );
  } else {
    next();
  }
};

exports.editProfile = (req, res) => {
  let profile = req.body;

  connection.query(
    `UPDATE ${SQL.tables.profiles} SET ? WHERE id=${req.profile_id}`,
    profile,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          message: "Profile has been set successfully",
        });
      }
    }
  );
};

exports.editImages = (req, res) => {
  const path = "upload_images/profile/";

  let values = {
    background_img: req.image.back_path,
    profile_pic_img: req.image.profile_path,
  };

  connection.query(
    `UPDATE ${SQL.tables.profiles} SET ? WHERE id=${req.profile_id}`,
    values,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else {
        for (let i in req.files) {
          if (i === "end") {
            res.json({
              success: true,
              message: "Updated",
            });
          } else {
            if (
              req.files[i].mimetype == "image/jpeg" ||
              req.files[i].mimetype == "image/png" ||
              req.files[i].mimetype == "image/jpg" ||
              req.files[i].mimetype == "image/webp" ||
              req.files[i].mimetype == "application/octet-stream"
            ) {
              req.files[i].mv(`public/${path}` + req.image[i]);
            } else {
              res.json({
                success: false,
                message: "This file type is not allowed",
              });
              break;
            }
          }
        }
      }
    }
  );
};
