const Razorpay = require("razorpay");
const crypto = require("crypto");
const request = require("request");
const chokidar = require("chokidar");

const { razorpay, SQL } = require("../../config");
const connection = require("../../database/connect");
const fs = require("fs");

const razorInstance = new Razorpay({
  key_id: razorpay.key_id,
  key_secret: razorpay.key_secret,
});

const watcher = chokidar.watch(`${__dirname}/pending_entry`, {
  persistent: true,
  atomic: true,
});

watcher.on("add", (event) => {
  let fileName = event.split("\\")[event.split("\\").length - 1];
  let paymentObject = require(`./pending_entry/${fileName}`);
  let entity = paymentObject.payload.payment.entity;

  let value = {
    order_id: entity.order_id,
    payment_id: entity.id,
    payment_object: JSON.stringify(paymentObject),
    payment_status: entity.status,
    payment_verification: paymentObject.payment_verification
      ? paymentObject.payment_verification
      : "pending",
  };

  connection.query(
    `SELECT * FROM ${SQL.tables.transactional.payment} WHERE order_id="${value.order_id}" AND payment_id="${value.payment_id}"`,
    (error, data) => {
      if (!error && data.length > 0) {
        connection.query(
          `UPDATE ${SQL.tables.transactional.payment} SET payment_object='${value.payment_object}',payment_status="${value.payment_status}",payment_verification="${value.payment_verification}" WHERE id=${data[0].id}`,
          (error) => {
            if (!error) {
              fs.unlink(`${__dirname}/pending_entry/${fileName}`, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            } else {
              console.log(error);
            }
          }
        );
      } else if (data.length == 0) {
        connection.query(
          `INSERT INTO ${SQL.tables.transactional.payment} SET ?`,
          value,
          (error) => {
            if (!error) {
              fs.unlink(`${__dirname}/pending_entry/${fileName}`, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            } else {
              console.log(error);
            }
          }
        );
      } else {
        console.log(error);
      }
    }
  );
});

exports.getOrder = (req, res) => {
  try {
    const options = req.body;

    razorInstance.orders.create(options, async (err, order) => {
      if (err) {
        res.json({
          success: false,
          error: err,
          message: "Something went wrong",
        });
      } else {
        res.json({
          success: true,
          data: order,
        });
      }
    });
  } catch (e) {
    res.json({
      success: false,
      error: e,
      message: "Error occured while initiating transaction",
    });
  }
};

exports.capturePayment = (req, res) => {
  try {
    return request(
      {
        method: "POST",
        url: `https://${razorpay.key_id}:${razorpay.key_secret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: req.body.amount,
          currency: req.body.currency,
        },
      },
      async (err, response, body) => {
        if (err) {
          res.json({
            success: false,
            message: "Something went wrong",
          });
        } else {
          res.json({
            success: true,
            data: body,
          });
        }
      }
    );
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.verification = (req, res) => {
  if (req.body.event == "payment.captured") {
    const shasum = crypto.createHmac("sha256", razorpay.verification_secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    let value = {
      order_id: req.body.payload.payment.entity.order_id,
      payment_id: req.body.payload.payment.entity.id,
      payment_object: JSON.stringify(req.body),
      payment_status: req.body.payload.payment.entity.status,
    };

    if (req.headers["x-razorpay-signature"] == digest) {
      value.payment_verification = "success";
      req.body.payment_verification = "success";
      connection.query(
        `INSERT IGNORE INTO ${SQL.tables.transactional.payment} SET ?`,
        value,
        (error, insert) => {
          if (error) {
            fs.writeFileSync(
              `${__dirname}/pending_entry/${value.order_id}.json`,
              JSON.stringify(req.body, null, 4)
            );
            return res.status(501).json({
              success: false,
              message: "Something went wrong",
            });
          } else {
            connection.query(
              `UPDATE ${SQL.tables.transactional.payment} SET subscription="paid" WHERE email="${req.body.payload.payment.entity.email}"`,
              (error) => {
                if (error) {
                  fs.writeFileSync(
                    `${__dirname}/pending_entry/${value.order_id}.json`,
                    JSON.stringify(req.body, null, 4)
                  );
                  return res.status(501).json({
                    success: false,
                    message: "Something went wrong",
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                  });
                }
              }
            );
          }
        }
      );
    } else {
      value.payment_verification = "failed";
      req.body.payment_verification = "failed";
      connection.query(
        `INSERT IGNORE INTO ${SQL.tables.transactional.payment} SET ?`,
        value,
        (error, insert) => {
          if (error) {
            fs.writeFileSync(
              `${__dirname}/pending_entry/${value.order_id}.json`,
              JSON.stringify(req.body, null, 4)
            );
            return res.status(501).json({
              success: false,
              message: "Something went wrong",
            });
          } else {
            connection.query(
              `UPDATE ${SQL.tables.transactional.payment} SET subscription="paid" WHERE email="${req.body.payload.payment.entity.email}"`,
              (error) => {
                if (error) {
                  fs.writeFileSync(
                    `${__dirname}/pending_entry/${value.order_id}.json`,
                    JSON.stringify(req.body, null, 4)
                  );
                  return res.status(501).json({
                    success: false,
                    message: "Something went wrong",
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                  });
                }
              }
            );
          }
        }
      );
    }
  } else {
    return res.status(501).json({
      success: false,
    });
  }
};
