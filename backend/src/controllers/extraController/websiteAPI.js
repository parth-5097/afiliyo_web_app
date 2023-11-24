const { randomFixedInteger } = require(".");
const { SQL, IMG } = require("../../config");
const connection = require("../../database/connect");
const { sendMail } = require("./mail_handler");

exports.webAPI = (req, res) => {
  let value = {
    page: req.body.page,
    data: JSON.stringify(req.body),
  };
  connection.query(
    `INSERT INTO ${SQL.tables.transactional.webApi} SET ?`,
    value,
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
          message: "Applied successfully",
        });
      }
    }
  );
};

exports.uploadWebImage = (req, res) => {
  if (req.files) {
    let file = req.files.file;
    file.name = randomFixedInteger(12) + "_" + file.name;
    let db_value = {
      path: `/upload_images/webImages/${file.name}`,
      img_name: file.name,
    };

    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp"
    ) {
      connection.query(
        `INSERT IGNORE INTO ${SQL.tables.transactional.image} SET ?`,
        db_value,
        (error) => {
          if (error) {
            res.json({
              success: false,
              message: "Internal server error",
            });
          } else {
            file.mv(`public${db_value.path}`, (error) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Internal server error",
                });
              } else {
                res.json({
                  success: true,
                  data: db_value.path,
                });
              }
            });
          }
        }
      );
    } else {
      res.json({
        success: false,
        message: "Check your file type, only (jpeg,jpg,png) are allowed",
      });
    }
  } else {
    res.json({
      success: false,
      message: "Select file to upload",
    });
  }
};

exports.mail = (req, res) => {
  if (req.body.email) {
    let mailDetails = {
      from: process.env.MAIL_USER,
      to: req.body.email,
      subject: "Calculator form submission",
      text: `Do not reply to this email for any query`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Afiliyo</title>
        <meta name="color-scheme" content="dark light">
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      
      <body style="margin: 0; padding: 0; font-family: 'Jost', sans-serif; background-color: #f2f2f2; color: #000;">
        <table width="100%" cellpadding="0" cellspacing="0" style="">
          <tr>
            <td>
              <table width="600px" cellpadding="0" cellspacing="0" style="margin: 0 auto; background-color: #fff; padding: 50px 50px; margin: 50px auto">
                <tr>
                  <td style="padding-top: 50px; text-align: center; margin:0 auto;">
                    <img src="http://13.127.164.220/assets/images/afliyo_logo-template.svg" alt="">
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;padding-bottom: 20px;">
                    <img src="http://13.127.164.220/assets/images/thank_you.png" alt="">
                  </td>
                </tr>
      
                <tr>
                  <td>
      
                    <p style="width: 557px; color: #000000; margin-bottom: 6px; font-size: 21px; font-family: Arial; line-height: 28px; color: #4A5566;">
                      Hi Candy 
                    </p>
                    <p style="margin-bottom: 0;margin-top: 0; font-size: 21px; font-family: Arial; line-height: 28px; color: #4A5566;">Thanks for signing up. We're  thrilled to have you on board.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size: 16px;line-height: 22px;color: #8492A6; font-family: Arial;">If you did not sign up for this account you can ignore this email and the account will be deleted automatically after 5 days.</p>
                  </td>
                </tr>
                <tr style="">
                  <td height="40" class="em_height" style="border-bottom: 1px solid #EDEDF2;">&nbsp;</td>
                </tr>	
                <tr>
                  <td>
                    <p style="font-size: 12px;line-height: 16px;font-family: Arial;color: #8492A6;">This email was sent to you as a registered member of Shopname.com. To update your emails preferences click here.Use of the service and website is subject to our Terms of Use and Privacy Statement.
                  </p>
                  <p style="font-size: 12px;line-height: 16px;font-family: Arial;color: #8492A6;">&copy; 2019 Shopname. All rights reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      </script>
      </body>
      </html>
      `,
    };
    sendMail(mailDetails)
      .then((data) => {
        res.json({
          success: true,
          message: "Email sent successfully,Check your inbox",
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message:
            "Can not send the mail at the momemt, please try after sometime",
        });
      });
  } else {
    res.json({
      success: false,
      message: "Email is required",
    });
  }
};
