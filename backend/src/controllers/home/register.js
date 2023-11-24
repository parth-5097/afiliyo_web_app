const bcrypt = require("bcrypt");
const connection = require("../../database/connect");
const { SQL, OTP } = require("../../config");
const { randomFixedInteger } = require("../extraController");
const { sendSMS, sendMail } = require("../extraController/mail_handler");

exports.register = (req, res, next) => {
  let roles = {
    role: req.body.role,
  };

  connection.query(
    `SELECT * FROM ${SQL.tables.roles} WHERE role = "${roles.role}"`,
    (error, data) => {
      if (error || data.length === 0) {
        connection.query(
          `INSERT IGNORE INTO ${SQL.tables.roles} SET ?`,
          roles,
          (error) => {
            if (error) {
              res.json({
                success: false,
                error: error,
                message: "Internal server error",
              });
            } else {
              connection.query(
                `SELECT * FROM ${SQL.tables.roles} WHERE role = "${roles.role}"`,
                (error, data) => {
                  if (error) {
                    res.json({
                      success: false,
                      error: error,
                      message: "Internal server error",
                    });
                  } else {
                    req.body.role_id = data[0].id;
                    next();
                  }
                }
              );
            }
          }
        );
      } else {
        req.body.role_id = data[0].id;
        next();
      }
    }
  );
};

exports.sendMessage = (req, res) => {
  const appSignature = req.body.appSignature;

  const code = randomFixedInteger(OTP.codeLength);

  req.body.password
    ? (req.body.password = bcrypt.hashSync(req.body.password, 10))
    : null;
  req.body.otp_iat = Date.now();
  delete req.body.role;

  connection.query(
    `INSERT INTO ${SQL.tables.users} SET ?`,
    req.body,
    (error) => {
      if (error) {
        res.send({
          success: false,
          error: error,
          message: "Your account is already registered",
        });
      } else if (req.body.phoneNumber) {
        sendSMS(
          [`+919624451035`],
          `Your verification code is: ${code} and your Affilio-app signature : ${appSignature}`
        )
          .then((response) => {
            connection.query(
              `UPDATE ${SQL.tables.users} SET otp_number=${code}, otp_status=FALSE WHERE phoneNumber="${req.body.phoneNumber}"`,
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
                    message: "OTP has been sent to your register mobile number",
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
      } else if (req.body.email) {
        let mailDetails = {
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: "Otp for registration",
          text: "Do not reply to this email for any query",
          html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; }
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0; 
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; }
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; }
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
              .body {
                background-color: #f6f6f6;
                width: 100%; }
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                Margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; }
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                Margin: 0 auto;
                max-width: 580px;
                padding: 10px; }
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #fff;
                border-radius: 3px;
                width: 100%; }
              .wrapper {
                box-sizing: border-box;
                padding: 20px; }
              .footer {
                clear: both;
                padding-top: 10px;
                text-align: center;
                width: 100%; }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; }
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                Margin-bottom: 30px; }
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; }
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                Margin-bottom: 15px; }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; }
              a {
                color: #3498db;
                text-decoration: underline; }
              /* -------------------------------------
                  BUTTONS
              ------------------------------------- */
              .btn {
                box-sizing: border-box;
                width: 100%; }
                .btn > tbody > tr > td {
                  padding-bottom: 15px; }
                .btn table {
                  width: auto; }
                .btn table td {
                  background-color: #ffffff;
                  border-radius: 5px;
                  text-align: center; }
                .btn a {
                  background-color: #ffffff;
                  border: solid 1px #3498db;
                  border-radius: 5px;
                  box-sizing: border-box;
                  color: #3498db;
                  cursor: pointer;
                  display: inline-block;
                  font-size: 14px;
                  font-weight: bold;
                  margin: 0;
                  padding: 12px 25px;
                  text-decoration: none;
                  text-transform: capitalize; }
              .btn-primary table td {
                background-color: #3498db; }
              .btn-primary a {
                background-color: #3498db;
                border-color: #3498db;
                color: #ffffff; }
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; }
              .first {
                margin-top: 0; }
              .align-center {
                text-align: center; }
              .align-right {
                text-align: right; }
              .align-left {
                text-align: left; }
              .clear {
                clear: both; }
              .mt0 {
                margin-top: 0; }
              .mb0 {
                margin-bottom: 0; }
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; }
              .powered-by a {
                text-decoration: none; }
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                Margin: 20px 0; }
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; }
                table[class=body] .content {
                  padding: 0 !important; }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; }
                table[class=body] .btn table {
                  width: 100% !important; }
                table[class=body] .btn a {
                  width: 100% !important; }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; }}
              @media all {
                .ExternalClass {
                  width: 100%; }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; } 
                .btn-primary table td:hover {
                  background-color: #34495e !important; }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; } }
            </style>
          </head>
          <body class="">
            <table border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
                    <table class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h1>Confirm your email</h1>
                                <h2>You are just one step away</h2>
                                <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                          <tbody>
                                            <tr>
                                              <td><h1>${code}</h1> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>Please ignore this email and your password will remain unchanged, if you did not make such request.\n\n</p><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
              
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Coloured.com.ng | Feminism | Culture | Law | Feminists Rising</span>
                            <br> Don't like these emails? <a href="#">Unsubscribe</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Powered by <a href="https://fb.me/jalasem">Jalasem</a>.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!-- END FOOTER -->
                    
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>`,
        };
        sendMail(mailDetails)
          .then((response) => {
            connection.query(
              `UPDATE ${SQL.tables.users} SET otp_number=${code}, otp_status=FALSE WHERE email="${req.body.email}"`,
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
                    message: "OTP has been sent to your register Email address",
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
      } else {
        res.json({
          success: false,
          message: "Registration failed, check your details",
        });
      }
    }
  );
};

exports.updatePersonalInfo = (req, res) => {
  if (req.body.otp_number) {
    sendSMS(
      [`+919624451035`],
      `Your verification code is: ${req.body.otp_number}`
    )
      .then((data) => {
        req.body.otp_status = false;
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
                code: req.body.otp_number,
                message: "Otp has been sent to your register mobile number",
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.json({
          success: false,
          message: "Can not send the message at the moment",
        });
      });
  } else {
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
            code: "User updated",
          });
        }
      }
    );
  }
};
