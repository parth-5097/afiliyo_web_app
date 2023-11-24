const nodemailer = require("nodemailer");
const { OTP } = require("../../config");

var messagebird = require("messagebird")(`${OTP.developmentApiKey}`);

let mailTransporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendMail = (mailDetails) => {
  return new Promise((resolve, reject) => {
    mailTransporter
      .sendMail(mailDetails)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.sendSMS = (number, body) => {
  const messageParam = {
    originator: "Affilio APP",
    recipients: [`+919624451035`], // change it to number when this go live
    body: body,
  };
  return new Promise((resolve, reject) => {
    messagebird.messages.create(messageParam, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
