const connection = require("../../database/connect");
const bcrypt = require("bcrypt");
const { SQL } = require("../../config");

exports.resetPassword = (req, res) => {
  let id = req.user.id;
  let oldPassword = req.body.oldpassword;
  let newPassword = req.body.newpassword;

  if (oldPassword !== newPassword) {
    connection.query(
      `SELECT password FROM ${SQL.tables.users} WHERE id= '${id}'`,
      (error, data) => {
        if (
          !error &&
          data.length > 0 &&
          bcrypt.compareSync(oldPassword, data[0].password) === true
        ) {
          connection.query(
            `UPDATE ${SQL.tables.users} SET password="${hash(
              newPassword
            )}" WHERE id="${id}"`,
            (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                res.json({
                  success: true,
                  message: "Password has been Updated",
                });
              }
            }
          );
        } else {
          res.json({
            success: false,
            error: error,
            message: "Check your current password",
          });
        }
      }
    );
  } else {
    res
      .status(406)
      .json({ success: false, message: "You can not set your old password" });
  }
};

const hash = (value) => {
  return bcrypt.hashSync(value, 10);
};
