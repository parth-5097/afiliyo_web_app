const express = require("express");
const cron = require("node-cron");
const { SQL } = require("../config");
const connection = require("../database/connect");
// const socketIOFile = require("socket.io-file");

let total = {
  activeUser: 0,
  totalAfilioUser: 0,
  totalPost: 0,
  totalItem: 0,
  totalBrand: 0,
  totalPostReport: 0,
  livePostViewer: {},
};
let socketId = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    const t = new Date(new Date().toUTCString());

    console.log(socket.id);
    total.activeUser++;
    express.static.activeUser = total.activeUser;
    connection.query(
      `SELECT COUNT(id) AS total FROM ${SQL.tables.users};
      SELECT COUNT(id) AS total FROM ${SQL.tables.post};
      SELECT COUNT(id) AS total FROM ${SQL.tables.items};
      SELECT COUNT(id) AS total FROM ${SQL.tables.brand};
      SELECT COUNT(id) AS total FROM ${SQL.tables.reports}`,
      (error, data) => {
        if (!error) {
          total.totalAfilioUser = data[0][0].total;
          total.totalPost = data[1][0].total;
          total.totalItem = data[2][0].total;
          total.totalBrand = data[3][0].total;
          total.totalPostReport = data[4][0].total;
          socket.emit("LIVE_COUNT", total);
        } else {
          socket.emit("SERVER_ERROR", {
            error: error,
            message: "Something went wrong",
          });
        }
      }
    );

    socket.emit("COUNTRY_TIME", [
      {
        name: "India",
        time: new Date(t.getTime() - -Math.floor(5.5 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
      {
        name: "Los Angeles",
        time: new Date(t.getTime() + -Math.floor(7 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
      {
        name: "Canada",
        time: new Date(t.getTime() + -Math.floor(4 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
      {
        name: "Hongkong",
        time: new Date(t.getTime() - -Math.floor(8 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
      {
        name: "Belgium",
        time: new Date(t.getTime() - -Math.floor(2 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
      {
        name: "Moskow",
        time: new Date(t.getTime() - -Math.floor(3 * 60 * 60 * 1000))
          .toISOString()
          .split("T")[1]
          .split(".")[0],
      },
    ]);

    cron.schedule("*/1 * * * * *", () => {
      const t = new Date(new Date().toUTCString());

      socket.emit("COUNTRY_TIME", [
        {
          name: "India",
          time: new Date(t.getTime() - -Math.floor(5.5 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
        {
          name: "Los Angeles",
          time: new Date(t.getTime() + -Math.floor(7 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
        {
          name: "Canada",
          time: new Date(t.getTime() + -Math.floor(4 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
        {
          name: "Hongkong",
          time: new Date(t.getTime() - -Math.floor(8 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
        {
          name: "Belgium",
          time: new Date(t.getTime() - -Math.floor(2 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
        {
          name: "Moskow",
          time: new Date(t.getTime() - -Math.floor(3 * 60 * 60 * 1000))
            .toISOString()
            .split("T")[1]
            .split(".")[0],
        },
      ]);
    });

    cron.schedule("*/10 * * * * *", () => {
      socket.emit("LIVE_COUNT", total);
    });

    socket.on("POST_REACH", (data) => {
      connection.query(
        `SELECT user_id FROM ${SQL.tables.reachPost} WHERE user_id=${data.user_id} AND post_id=${data.post_id}`,
        (error, resData) => {
          if (error) {
            console.log(error);
            socket.emit("SERVER_ERROR", {
              message: "Internal server error",
            });
          } else if (resData.length == 0) {
            connection.query(
              `INSERT INTO ${SQL.tables.reachPost} SET ?;UPDATE ${SQL.tables.post} SET reach=reach+1 WHERE id=${data.post_id} AND user_id!=${data.user_id}`,
              { user_id: data.user_id, post_id: data.post_id },
              (error) => {
                if (error) {
                  console.log(error);
                  socket.emit("SERVER_ERROR", {
                    message: "Internal server error",
                  });
                }
              }
            );
          }
        }
      );
    });

    socket.on("POST_IMPRESSION", (data) => {
      connection.query(
        `SELECT user_id FROM ${SQL.tables.impressionPost} WHERE user_id=${data.user_id} AND post_id=${data.post_id}`,
        (error, resData) => {
          if (error) {
            console.log(error);
            socket.emit("SERVER_ERROR", {
              message: "Internal server error",
            });
          } else if (resData.length == 0) {
            connection.query(
              `INSERT INTO ${SQL.tables.impressionPost} SET ?;UPDATE ${SQL.tables.post} SET impression=impression+1 WHERE id=${data.post_id} AND user_id!=${data.user_id}`,
              { user_id: data.user_id, post_id: data.post_id },
              (error) => {
                if (error) {
                  socket.emit("SERVER_ERROR", {
                    error: error,
                    message: "Internal server error",
                  });
                }
              }
            );
          }
        }
      );
    });

    socket.on("LINK_CLICK", (data) => {
      connection.query(
        `SELECT user_id FROM ${SQL.tables.item_click} WHERE user_id=${data.user_id} AND item_id=${data.item_id}`,
        (error, resData) => {
          if (error) {
            console.log(error);
            socket.emit("SERVER_ERROR", {
              message: "Internal server error",
            });
          } else if (resData.length == 0) {
            connection.query(
              `INSERT INTO ${SQL.tables.item_click} SET ?;UPDATE ${SQL.tables.items} SET clicks=clicks+1 WHERE id=${data.item_id} AND user_id!=${data.user_id}`,
              { user_id: data.user_id, item_id: data.item_id },
              (error) => {
                if (error) {
                  socket.emit("SERVER_ERROR", {
                    error: error,
                    message: "Internal server error",
                  });
                }
              }
            );
          }
        }
      );
    });

    socket.on("POST_ADD_LIVE_VIEWER", (data) => {
      if (data.post_id.length == 1) {
        total.livePostViewer[data.post_id]
          ? (total.livePostViewer[data.post_id] =
              total.livePostViewer[data.post_id])
          : (total.livePostViewer[data.post_id] = 0);
        total.livePostViewer[data.post_id]++;
      }
      if (data.post_id.length > 1) {
        data.post_id.split(",").map((e) => {
          total.livePostViewer[e]
            ? (total.livePostViewer[e] = total.livePostViewer[e])
            : (total.livePostViewer[e] = 0);
          total.livePostViewer[e]++;
        });
      }
    });

    socket.on("disconnect", (reason) => {
      total.activeUser--;
      express.static.activeUser = total.activeUser;
    });
  });
};
//NOTE: chat module
// io.use((socket, next) => {
//   console.log(socket.request._query.user_id);
//   socketId[socket.request._query.user_id] = socket.id;
//   next();
// });
//   io.on("connection", (socket) => {
//     socket.on("UPLOAD_IMG", (data) => {
//       console.log(data);
//     });
//     var uploader = new socketIOFile(socket, {
//       uploadDir: `public/upload_images/chat/`,
//       transmissionDelay: 0,
//       overwrite: false,
//     });

//     uploader.on("start", (fileInfo) => {});
//     uploader.on("stream", (fileInfo) => {});
//     uploader.on("complete", (fileInfo) => {
//       let value = {
//         sender_id: fileInfo.data.sender_id,
//         reciever_id: fileInfo.data.reciever_id,
//         msg: fileInfo.data.msg ? fileInfo.data.msg : "",
//         url: `/upload_images/chat/${fileInfo.name}`,
//       };
//       connection.query(
//         `INSERT INTO ${SQL.tables.chat} SET ?`,
//         value,
//         (error) => {
//           if (error) {
//   socket.emit("SERVER_ERROR", {
//     error: error,
//     message: "Internal server error",
//   });
//             io.to(socketId[value.sender_id]).emit("CHAT_PENDING", { value });
//           } else {
//             socketId[value.reciever_id]
//               ? io
//                   .to(socketId[value.reciever_id])
//                   .emit("CHAT_RECIEVE", { value })
//               : io
//                   .to(socketId[value.sender_id])
//                   .emit("CHAT_PENDING", { value });
//           }
//         }
//       );
//     });
//     uploader.on("error", (err) => {
//       socket.emit("CLIENT_ERROR", {
//         error: err,
//         message: "Error while streaming your file",
//       });
//     });
//     uploader.on("abort", (fileInfo) => {
//       socket.emit("FILE_ABORT", {
//         fileInfo: fileInfo,
//         message: "Abort file uploading by client",
//       });
//     });

//     socket.on("CHAT_SEND", (data) => {
//       connection.query(
//         `INSERT INTO ${SQL.tables.chat} SET ? `,
//         data,
//         (error) => {
//           if (error) {
//             socket.emit("SERVER_ERROR", {
//               error: error,
//               message: "Internal server error",
//             });
//             io.to(socketId[data.sender_id]).emit("CHAT_PENDING", { data });
//           } else {
//             socketId[data.reciever_id]
//               ? io.to(socketId[data.reciever_id]).emit("CHAT_RECIEVE", { data })
//               : io.to(socketId[data.sender_id]).emit("CHAT_PENDING", { data });
//           }
//         }
//       );
//     });

//     socket.on("CHAT_ROOM", (data) => {
//       socket.join(data.room_id);

//       connection.query(
//         `INSERT INTO ${SQL.tables.chat} SET ?`,
//         data,
//         (error) => {
//           if (error) {
//             socket.emit("SERVER_ERROR", {
//               error: error,
//               message: "Internal server error",
//             });
//           } else {
//             io.sockets.in(data.room_id).emit("CHAT_RECIEVE", { data });
//           }
//         }
//       );
//     });

// socket.on("disconnect", (reason) => {
//     Object.keys(socketId).forEach((k) => {
//       socketId[k] === socket.id ? delete socketId[k] : socketId[k];
//     });
//   });
// });
