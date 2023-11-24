const jwt = require("jsonwebtoken");
const { SQL, JWT } = require("../../config");
const connection = require("../../database/connect");
const { blacklist } = require("./login");

exports.eLogin = (req, res) => {
  let value = req.body;
  let profile = {
    bio: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    background_img: "/upload_images/defaultProfile/background.jpg",
    profile_pic_img: value.profile_pic_img,
  };

  connection.query(
    `SELECT t1.id,t1.name,t1.username,t1.email,t1.refer_code,t1.interest,t2.role,t1.profile_id FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id=t2.id WHERE t1.email="${value.email}"`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Internal server error",
        });
      } else if (data.length === 0) {
        delete value.profile_pic_img;
        let roles = {
          role: value.role,
        };

        connection.query(
          `INSERT IGNORE INTO ${SQL.tables.roles} SET ?;SELECT id FROM ${SQL.tables.roles} WHERE role="${roles.role}"`,
          roles,
          (error, data1) => {
            if (error) {
              res.json({
                success: false,
                message: "Internal server error",
              });
            } else {
              delete value.role;
              value.role_id = data1[1][0].id;
              connection.query(
                `INSERT INTO ${SQL.tables.profiles} SET ?`,
                profile,
                (error, insert) => {
                  if (error) {
                    res.json({
                      success: false,
                      message: "Internal server error",
                    });
                  } else {
                    value.profile_id = insert.insertId;
                    value.loginStatus = 1;
                    connection.query(
                      `INSERT INTO ${SQL.tables.users} SET ?;SELECT t1.id,t1.email,t1.username,t1.refer_code,t1.interest,t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id=t2.id WHERE t1.email="${value.email}"`,
                      value,
                      (error, data1) => {
                        if (error) {
                          console.log(error);
                          res.json({
                            success: false,
                            message: "Internal server error",
                          });
                        } else if (data1[1][0]) {
                          res.json({
                            success: false,
                            message:
                              "Your account is already register with this email",
                          });
                        } else {
                          let resData = {
                            loginToken: jwt
                              .sign(
                                {
                                  id: data1[1][0].id,
                                  role: data1[1][0].role,
                                  refer_code: data1[1][0].refer_code,
                                  interest: data1[1][0].interest,
                                },
                                JWT.loginSecretKey
                              )
                              .split(".")
                              .map((e) => {
                                return (e =
                                  "a5F0l9Y7" +
                                  e.split("").reverse().join("") +
                                  "a5F0l9Y7");
                              })
                              .join("."),
                            username: data1[1][0].username,
                            profile_id: value.profile_id,
                          };
                          blacklist(data1[1][0].id, resData.loginToken)
                            .then((ans) => {
                              res.json({
                                success: true,
                                data: resData,
                                message: "Logged In",
                              });
                            })
                            .catch((err) => {
                              console.log(err);
                              res.json({
                                success: false,
                                message: "Something went wrong",
                              });
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
        let resData = {
          loginToken: jwt
            .sign(
              {
                id: data[0].id,
                role: data[0].role,
                refer_code: data[0].refer_code,
                interest: data[0].interest,
              },
              JWT.loginSecretKey
            )
            .split(".")
            .map((e) => {
              return (e =
                "a5F0l9Y7" + e.split("").reverse().join("") + "a5F0l9Y7");
            })
            .join("."),
          username: data[0].username,
          profile_id: data[0].profile_id,
        };
        blacklist(data[0].id, resData.loginToken)
          .then((ans) => {
            res.json({
              success: true,
              data: resData,
              message: "Logged In",
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              success: false,
              message: "Something went wrong",
            });
          });
      }
    }
  );
};
