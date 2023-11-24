const { SQL, PAGINATION } = require("../../config");
const connection = require("../../database/connect");

exports.getAllData = (req, res) => {
  let offset = req.query.offset ? req.query.offset : PAGINATION.users.offset;
  let limit = req.query.limit ? req.query.limit : PAGINATION.users.limit;

  connection.query(
    `SELECT t2.role,t1.id,t1.loginStatus,t1.name,t1.email,t1.username,t1.phoneNumber,t1.gender,t1.dob,t1.reward,t1.subscription,t1.otp_status from ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id=t2.id LIMIT ? OFFSET ?`,
    [parseInt(limit), parseInt(offset)],
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          error: error,
          message: "Internal server error",
        });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    }
  );
};

exports.getUserData = (req, res) => {
  connection.query(
    `SELECT phoneNumber,email,name,dob FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
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
    }
  );
};

exports.getAllRequestedRole = (req, res) => {
  connection.query(
    `SELECT t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id = t2.id WHERE t1.id=${req.user.id}`,
    (error, data) => {
      if (error || data.length === 0) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data[0].role === "admin") {
        connection.query(
          `SELECT * FROM ${SQL.tables.requestNewRole} ORDER BY timestamp DESC`,
          (error, data) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              res.json({
                success: true,
                data: data,
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: "Only admin can view all data",
        });
      }
    }
  );
};

exports.getCategory = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.category}`, (error, data) => {
    if (!error && data.length > 0) {
      res.json({
        success: true,
        data: data,
      });
    } else if (data.length === 0) {
      res.json({
        success: false,
        message: "Add some records from admin account",
      });
    } else {
      res.json({
        success: false,
        error: error,
        message: "Internal server error",
      });
    }
  });
};

exports.getBrand = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.brand}`, (error, data) => {
    if (!error && data.length > 0) {
      res.json({
        success: true,
        data: data,
      });
    } else if (data.length === 0) {
      res.json({
        success: false,
        message: "Add some records from admin account",
      });
    } else {
      res.json({
        success: false,
        message: "Internal server error or no records found",
      });
    }
  });
};

exports.getSize = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.size}`, (error, data) => {
    if (!error && data.length > 0) {
      res.json({
        success: true,
        data: data,
      });
    } else if (data.length === 0) {
      res.json({
        success: false,
        message: "Add some records from admin account",
      });
    } else {
      res.json({
        success: false,
        message: "Internal server error",
      });
    }
  });
};

exports.getColor = (req, res) => {
  connection.query(`SELECT * FROM ${SQL.tables.color}`, (error, data) => {
    if (!error && data.length > 0) {
      res.json({
        success: true,
        data: data,
      });
    } else if (data.length === 0) {
      res.json({
        success: false,
        message: "Add some records from admin account",
      });
    } else {
      res.json({
        success: false,
        message: "Internal server error",
      });
    }
  });
};

exports.getHashtag = (req, res) => {
  connection.query(
    `SELECT id,name FROM ${SQL.tables.hashtag}`,
    (error, data) => {
      if (!error && data.length > 0) {
        res.json({
          success: true,
          data: data,
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "Add some records from admin account",
        });
      } else {
        res.json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );
};

exports.getPopularHashtag = (req, res) => {
  connection.query(
    `SELECT id,name FROM ${SQL.tables.hashtag} ORDER BY countPost DESC`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
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
    }
  );
};

exports.getUsernameSuggestion = (req, res) => {
  connection.query(
    `SELECT id FROM ${SQL.tables.users} WHERE username="${req.params.username}"`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.json({
          success: true,
          exist: data[0] ? true : false,
          data: [
            `${req.params.username}${Math.random()
              .toString(36)
              .substring(2, 7)}`,
            `${Math.random().toString(36).substring(2, 7)}${
              req.params.username
            }`,
            `${Math.random().toString(36).substring(2, 12)}`,
          ],
        });
      }
    }
  );
};
