const connection = require("../../database/connect");
const { SQL, OTP } = require("../../config");

exports.verifyOtpForNewUser = (req, res, next) => {
  if (req.body.otp_status == true) {
    connection.query(
      `SELECT t1.*,t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id = t2.id WHERE t1.phoneNumber="${req.body.phoneNumber}" OR email="${req.body.email}"`,
      (error, data) => {
        if (!error && data.length > 0) {
          req.login = data[0];
          next();
        } else {
          res.json({
            success: false,
            message: "Enter the correct phone number or email address",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: `Try to validate before ${OTP.expire_time} sec`,
    });
  }
};

exports.verifyOtpForUpdateUser = (req, res) => {
  if (req.body.otp_status == true) {
    res.json({
      success: true,
      message: "Otp verified with data updation",
    });
  } else {
    delete req.body.code;
    delete req.body.otp_status;
    connection.query(
      `UPDATE ${SQL.tables.users} SET ? WHERE phoneNumber="${req.body.phoneNumber}" OR email="${req.body.email}"`,
      req.body,
      (error) => {
        if (error) {
          console.log(error);
          res.json({
            success: false,
            message: "Something went wrong",
          });
        } else {
          res.json({
            success: true,
            message:
              "Your otp verification failed, try after some time to change data",
          });
        }
      }
    );
  }
};
