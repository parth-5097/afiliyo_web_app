const fcm = require("firebase-admin");

const serviceAccount = require("./key.json");

fcm.initializeApp({
  credential: fcm.credential.cert(serviceAccount),
});

exports.notificationToOne = (fcmToken, payload) => {
  //you can send only notification or only data(or include both)
  let message = {
    notification: payload,
    data: {
      my_key: "my value",
      my_another_key: "my another value",
    },
  };
  return new Promise((resolve, reject) => {
    fcm
      .messaging()
      .sendToDevice([fcmToken], message)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.notificationToAll = (fcmToken, payload) => {
  // registration_ids: fcmToken,
  let message = {
    notification: payload,
    data: {
      my_key: "my value",
      my_another_key: "my another value",
    },
  };
  return new Promise((resolve, reject) => {
    fcm
      .messaging()
      .sendToDevice(fcmToken, message)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
