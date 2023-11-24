const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.getReportCategory = (req, res) => {
  res.json({
    success: true,
    data: [
      "It's spam",
      "Nudity or sexual activity",
      "Hate speech or symbols",
      "Violance or dangerous organizations",
      "Sale of illegal or regulated goods",
      "Bullying or harassment",
      "Intellectual property violation",
      "Suicide, self-injury or eating disorders",
      "Scam or fraud",
      "False information",
      "I just don't get it",
    ],
  });
};

exports.addReports = (req, res) => {
  req.body.form = req.body.form ? JSON.stringify(req.body.form) : req.body.form;
  req.body.user_id = req.user.id;

  let sql = req.body.profile_id
    ? `INSERT INTO ${SQL.tables.reports} SET ?;UPDATE ${SQL.tables.profiles} SET block=IF(block != NULL,CONCAT(block,',','${req.body.profile_id}'),'${req.body.profile_id}') WHERE id=${req.user.id}`
    : `INSERT INTO ${SQL.tables.reports} SET ?`;

  connection.query(sql, req.body, (error) => {
    if (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Internal server error",
      });
    } else {
      res.json({
        success: true,
        message: "Your report has been registered successfully",
      });
    }
  });
};

exports.getReports = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.reports}`, (error, data) => {
    if (error) {
      res.json({
        success: false,
        message: "Something went wrong",
      });
    } else if (data.length == 0) {
      res.json({
        success: false,
        message: "No records found",
      });
    } else {
      res.json({
        success: true,
        data: data,
      });
    }
  });
};

exports.editReports = (req, res) => {
  req.body.form = JSON.stringify(req.body.form);
  connection.query(
    `UPDATE ${SQL.tables.reports} SET ? WHERE id=${req.params.id}`,
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
          message: "Reports has been updated",
        });
      }
    }
  );
};

exports.deleteReports = (req, res) => {
  connection.query(
    `DELETE FROM ${SQL.tables.reports} WHERE id=${req.params.id}`,
    (error) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.json({
          success: true,
          message: "Your report has been deleted",
        });
      }
    }
  );
};
