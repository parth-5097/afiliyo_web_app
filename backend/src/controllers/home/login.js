const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SQL, OTP, JWT } = require("../../config");
const connection = require("../../database/connect");
const { randomFixedInteger } = require("../extraController");
const { sendSMS } = require("../extraController/mail_handler");

exports.checkEmailOrPhone = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let appSignature = req.body.appSignature;

  let code = randomFixedInteger(OTP.codeLength);

  connection.query(
    `SELECT t1.*,t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id = t2.id WHERE t1.email="${email}" OR t1.phoneNumber="${req.body.phoneNumber}"`,
    (error, data) => {
      if (!error && data.length > 0) {
        if (req.body.email) {
          if (bcrypt.compareSync(password, data[0].password) === true) {
            req.login = data[0];
            next();
          } else {
            res.json({
              success: false,
              message: "Invalid login credential",
            });
          }
        } else {
          sendSMS(
            [`+919624451035`],
            `Your verification code is: ${code} and your Affilio-app signature : ${appSignature}`
          )
            .then((response) => {
              connection.query(
                `UPDATE ${
                  SQL.tables.users
                } SET otp_number=${code}, otp_status=FALSE, otp_iat=${Date.now()} WHERE phoneNumber="${
                  req.body.phoneNumber
                }"`,
                (error) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Failed to send message",
                    });
                  } else {
                    res.json({
                      success: true,
                      response: response.body,
                      code: code,
                      message:
                        "OTP has been sent to your register mobile number",
                    });
                  }
                }
              );
            })
            .catch((err) => {
              res.json({
                success: false,
                error: err,
                message: "Failed to send message",
              });
            });
        }
      } else {
        res.json({
          success: false,
          message: "Enter the correct email address or phone number",
        });
      }
    }
  );
};

exports.login = (req, res) => {
  const token = jwt.sign(
    {
      id: req.login.id,
      role: req.login.role,
      refer_code: req.login.refer_code,
      interest: req.login.interest,
    },
    JWT.loginSecretKey
  );
  let resData = {
    loginToken: token
      .split(".")
      .map((e) => {
        return (e = "a5F0l9Y7" + e.split("").reverse().join("") + "a5F0l9Y7");
      })
      .join("."),
    id: req.login.id,
    profile_id: req.login.profile_id,
    gender: req.login.gender,
    username: req.login.username,
    dob: req.login.dob,
    phoneNumber: req.login.phoneNumber,
    email: req.login.email,
  };
  this.blacklist(resData.id, resData.loginToken)
    .then((ans) => {
      connection.query(
        `SELECT t1.profile_id,t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id=t2.id WHERE t1.email="${req.body.email}" OR t1.phoneNumber="${req.body.phoneNumber}"`,
        (error, data) => {
          if (error) {
            res.json({
              success: false,
              error: error,
              message: "Internal server error",
            });
          } else {
            resData.role = req.login.role;
            let value = {
              loginStatus: true,
            };
            req.body.fcmToken ? (value.fcm_token = req.body.fcmToken) : null;
            connection.query(
              `UPDATE ${SQL.tables.users} SET ? WHERE id=${resData.id}`,
              value,
              (error) => {
                if (error) {
                  console.log(error);
                  res.json({
                    success: false,
                    message: "Internal server error",
                  });
                } else if (req.login.profile_id) {
                  res.json({
                    success: true,
                    message: "Logged In",
                    data: resData,
                  });
                } else {
                  connection.query(
                    `UPDATE ${SQL.tables.users} SET profile_id=1 WHERE id=${resData.id}`,
                    (error) => {
                      if (error) {
                        res.json({
                          success: false,
                          message: "Internal server error",
                        });
                      } else {
                        res.json({
                          success: true,
                          message: "Logged In",
                          data: resData,
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
    })
    .catch((e) => {
      res.json({
        success: false,
        message: `Your account is lock, try after some time`,
      });
    });
};

exports.signout = (req, res) => {
  let id = req.user.id;

  connection.query(
    `UPDATE ${SQL.tables.users} SET loginStatus=FALSE WHERE id=${id}`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          error: error,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          message: "Successfully logout",
        });
      }
    }
  );
};

exports.blacklist = (id, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT false_attempt,block,timestamp FROM ${SQL.tables.transactional.token_blacklist} WHERE user_id=${id}`,
      (error, data) => {
        if (error) {
          return reject("Something went wrong");
        } else if (data.length == 0) {
          connection.query(
            `INSERT INTO ${SQL.tables.transactional.token_blacklist} SET ?`,
            {
              user_id: id,
              token: token,
            },
            (error) => {
              if (error) {
                return reject();
              } else {
                resolve();
              }
            }
          );
        } else {
          if (data[0].block == 0) {
            connection.query(
              `UPDATE ${SQL.tables.transactional.token_blacklist} SET token="${token}" WHERE user_id=${id}`,
              (error) => {
                if (error) {
                  console.log(error);
                  return reject(error);
                } else {
                  resolve();
                }
              }
            );
          } else {
            if (
              new Date(data[0].timestamp).getTime() + 24 * 60 * 60 * 1000 >=
              Date.now()
            ) {
              return reject();
            } else {
              connection.query(
                `DELETE FROM ${SQL.tables.transactional.token_blacklist} WHERE user_id=${id};INSERT INTO ${SQL.tables.transactional.token_blacklist} SET ?`,
                {
                  user_id: id,
                  token: token,
                },
                (error) => {
                  if (error) {
                    return reject();
                  } else {
                    resolve();
                  }
                }
              );
            }
          }
        }
      }
    );
  });
};
