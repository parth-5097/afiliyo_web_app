const connection = require("../database/connect");
const jwt = require("jsonwebtoken");
const { SQL, JWT, OTP } = require("../config");
const { randomFixedInteger } = require("../controllers/extraController");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization
      .split(".")
      .map((e) => {
        return (e = e.split("").reverse().join(""));
      })
      .join(".");
    jwt.verify(
      token.split("7Y9l0F5a").join(""),
      JWT.loginSecretKey,
      (error, data) => {
        if (error) {
          console.log(error);
          res.json({
            statusCode: 498,
            success: false,
            message: "Invalid token or user not found",
          });
        } else {
          req.user = data;
          connection.query(
            `SELECT t1.loginStatus,t1.email,t1.fcm_token,t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id=t2.id WHERE t1.id=${req.user.id}`,
            (error, data) => {
              if (error) {
                console.log(error);
                res.json({
                  statusCode: 500,
                  success: false,
                  message: "Something went wrong",
                });
              } else if (data.length === 0) {
                res.json({
                  statusCode: 404,
                  success: false,
                  message: "First signup with valid details",
                });
              } else if (data[0].loginStatus === 0) {
                res.json({
                  statusCode: 401,
                  success: false,
                  message:
                    "You have not loged into your account or your token is expired due to multiple device login",
                });
              } else {
                req.user.email = data[0].email;
                req.user.fcm_token = data[0].fcm_token;
                req.user.role = data[0].role;
                connection.query(
                  `SELECT token,false_attempt,block,timestamp FROM ${SQL.tables.transactional.token_blacklist} WHERE user_id=${req.user.id}`,
                  (error, data) => {
                    if (error) {
                      console.log(error);
                      res.json({
                        statusCode: 500,
                        success: false,
                        message: "Something went wrong",
                      });
                    } else if (data.length === 0) {
                      res.json({
                        statusCode: 401,
                        success: false,
                        message: "Please login again",
                      });
                    } else if (data[0].block == 0 || data[0].block == false) {
                      if (data[0].token !== req.headers.authorization) {
                        connection.query(
                          `UPDATE ${SQL.tables.users} SET loginStatus=FALSE WHERE id=${req.user.id}`,
                          (error) => {
                            if (!error) {
                              data[0].false_attempt++;
                              connection.query(
                                `UPDATE ${
                                  SQL.tables.transactional.token_blacklist
                                } SET false_attempt=false_attempt+1${
                                  data[0].false_attempt > 10
                                    ? ",block=TRUE"
                                    : ""
                                } WHERE user_id=${req.user.id}`,
                                (error) => {
                                  console.log(error);
                                  res.json({
                                    statusCode: 401,
                                    success: false,
                                    message:
                                      "Bad request detected, may be tempered by someone or your token is expired or your account is logged into another device, we will block your account after 3rd false attempt",
                                  });
                                }
                              );
                            } else {
                              console.log(error);
                              res.json({
                                success: false,
                                message: "Something went wrong",
                              });
                            }
                          }
                        );
                      } else if (
                        (data[0].block == 0 || data[0].block == false) &&
                        data[0].token === req.headers.authorization &&
                        data[0].false_attempt <= 10
                      ) {
                        next();
                      } else {
                        res.json({
                          statusCode: 401,
                          success: false,
                          message:
                            "Token expired, please login again to continue",
                        });
                      }
                    } else {
                      res.json({
                        success: false,
                        message: "Your account is lock for 24 hour",
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
      statusCode: 499,
      success: false,
      message: "Authorization (Bearer token) required",
    });
  }
};

exports.dropPendingEntry = (req, res, next) => {
  connection.query(
    `SELECT otp_status FROM ${SQL.tables.users} WHERE email="${req.body.email}" OR phoneNumber="${req.body.phoneNumber}"`,
    (error, data) => {
      if (error || data.length == 0) {
        console.log(error);
        next();
      } else if (data[0].otp_status == false || data[0].otp_status == 0) {
        connection.query(
          `DELETE FROM ${SQL.tables.users} WHERE email="${req.body.email}" OR phoneNumber="${req.body.phoneNumber}"`,
          (error) => {
            if (error) {
              res.json({
                success: false,
                error: error,
                message: `Internal server error`,
              });
            } else {
              next();
            }
          }
        );
      } else {
        next();
      }
    }
  );
};

exports.checkReferCode = (req, res, next) => {
  if (req.body.refer_code) {
    connection.query(
      `SELECT refer_code FROM ${SQL.tables.refer} WHERE refer_code="${req.body.refer_code}"`,
      (error, data) => {
        if (error) {
          res.json({
            success: false,
            message: "Internal server error",
          });
        } else if (data.length === 0) {
          res.json({
            success: false,
            message: "Check your refer code",
          });
        } else {
          req.body.reward = 25;
          next();
        }
      }
    );
  } else {
    next();
  }
};

/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 18:31:23
 * @modify date 2021-02-24 18:31:23
 * @desc [Added solution for frontend null or empty string handle on backend (Not neccessary)]
 */

exports.removeNull = (req, res, next) => {
  Object.keys(req.body).forEach((e) => {
    req.body[e] ? req.body[e] : delete req.body[e];
  });
  next();
};

exports.checkForOtpSend = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    connection.query(
      `SELECT phoneNumber FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
      (error, data) => {
        if (error) {
          res.json({
            success: false,
            message: "Something went wrong",
          });
        } else if (req.body.email || req.body.phoneNumber) {
          req.body.otp_number = randomFixedInteger(6);
          next();
        } else {
          next();
        }
      }
    );
  } else {
    res.json({
      success: true,
      message: "Updated",
    });
  }
};

exports.checkVerifyOtp = (req, res, next) => {
  let otp_exp = Date.now();
  let phoneNumber = req.body.phoneNumber;
  let code = req.body.code;

  connection.query(
    `SELECT otp_iat, otp_number, otp_status FROM ${SQL.tables.users} WHERE phoneNumber="${phoneNumber}" OR email="${req.body.email}"`,
    (error, data) => {
      if (!error && data.length > 0) {
        const difference = (otp_exp - data[0].otp_iat) / 1000;
        if (difference <= OTP.expire_time) {
          if (
            (phoneNumber || req.body.email) &&
            JSON.stringify(code).length == 6
          ) {
            if (code == data[0].otp_number && req.body.email) {
              connection.query(
                `UPDATE ${SQL.tables.users} SET otp_status=TRUE WHERE email="${req.body.email}"`,
                (error) => {
                  if (error) {
                    res.json({
                      success: false,
                      message:
                        "Something went wrong please try after some time with new request",
                    });
                  } else {
                    req.body.otp_status = true;
                    next();
                  }
                }
              );
            } else if (code == data[0].otp_number && phoneNumber) {
              req.body.otp_status = true;
              next();
            } else {
              res.json({
                success: false,
                message: "Enter the valid code",
              });
            }
          } else {
            res.json({
              success: false,
              message: `Enter valid mobile number or email and code should be 6 character long`,
            });
          }
        } else if (data[0].otp_status !== 1) {
          req.body.otp_status = false;
          next();
        } else {
          res.json({
            success: false,
            message: `Try to validate before ${OTP.expire_time} sec`,
          });
        }
      } else {
        console.log(error);
        res.json({
          success: false,
          messgae: "First send the otp",
        });
      }
    }
  );
};

exports.checkOtpForUpdateUser = (req, res) => {
  connection.query(
    `SELECT otp_iat, otp_number, otp_status FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "No record found",
        });
      } else {
        if (req.body.code == data[0].otp_number) {
          delete req.body.code;
          connection.query(
            `UPDATE ${SQL.tables.users} SET ? WHERE id=${req.user.id}`,
            req.body,
            (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Something went wrong",
                });
              } else {
                res.json({
                  success: true,
                  message: "Records updated",
                });
              }
            }
          );
        } else {
          res.json({
            success: false,
            message: "Check your verification code",
          });
        }
      }
    }
  );
};
