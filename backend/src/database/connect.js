const mysql = require("mysql");
const { SQL } = require("../config");

const connection = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  queueLimit: 1000,
  host: `${SQL.host}`,
  user: `${SQL.user}`,
  password: `${SQL.password}`,
  database: `${SQL.database}`,
  multipleStatements: true,
});

module.exports = connection;
