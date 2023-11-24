const express = require("express");
const fileUpload = require("express-fileupload");
const {
  isRequestValidated,
  validateAdddetailsRequest,
  validateOtpRequest,
  validateForgotPasswordRequest_1,
  validateForgotPasswordRequest_2,
  validateLoginRequest,
  validateFirebaseNotification,
  validateSocialLogin,
  validateFeedback,
  validateInviteFriends,
  validateUrlForAdultWord,
} = require("../validator/validation");
const { addUserDetails } = require("../controllers/Details/addDetails");
const { verifyOtpForNewUser } = require("../controllers/home/verifyOtp");
const {
  forgetPassword,
  verifyPassword,
} = require("../controllers/home/forgotPassword");
const { login, checkEmailOrPhone } = require("../controllers/home/login");
// const { removeDir } = require("../controllers/Images/middleware");
const { scrapImages } = require("../controllers/Images/scrappImages");
const { eLogin } = require("../controllers/home/socialLogin");
const {
  webAPI,
  uploadWebImage,
  mail,
} = require("../controllers/extraController/websiteAPI");
const { updateFcmToken } = require("../controllers/postSection/middleware");
const { speedLimiter, loginLimiter } = require("../config");
const { feedback } = require("../controllers/Details/saveDetails");
const {
  inviteFriends,
  urlValidationForAdultWord,
} = require("../controllers/activity/activity");
const { getPopularPost } = require("../controllers/postSection/posts");
const {
  setOffset,
  discovery,
} = require("../controllers/postSection/discovery");
const {
  getCategory,
  getHashtag,
  getPopularHashtag,
  getUsernameSuggestion,
} = require("../controllers/Details/getDetails");
const { checkVerifyOtp } = require("../middleware/middleware");
const { getSpecificItem } = require("../controllers/postSection/item");

const { Country, City, State } = require("../controllers/extraController/csc");

const router = express.Router();
router.use(fileUpload());

//NOTE:authRoute calling
router.post(
  "/login",
  validateLoginRequest,
  isRequestValidated,
  checkEmailOrPhone,
  login
);
router.post("/elogin", validateSocialLogin, isRequestValidated, eLogin);

router.post(
  "/adddata",
  validateAdddetailsRequest,
  isRequestValidated,
  addUserDetails
);

router.post(
  "/verifyotp",
  validateOtpRequest,
  isRequestValidated,
  checkVerifyOtp,
  verifyOtpForNewUser,
  login
);

//NOTE: all routes for forgot password
router.post(
  "/forgotpassword",
  validateForgotPasswordRequest_1,
  isRequestValidated,
  forgetPassword
);
// router.get("/reset", getPasswordForm);
router.post(
  "/verifypassword",
  validateForgotPasswordRequest_2,
  isRequestValidated,
  verifyPassword
);

//NOTE: popular post without login
router.get("/popularpost/:region", getPopularPost);
router.post("/discovery/:region", setOffset, discovery);
router.get("/category", getCategory);
router.get("/hashtag", getHashtag);
router.get("/popularhash", getPopularHashtag);

//NOTE: webAPI for influencer, career and brand
router.post("/form", webAPI);
router.post("/formimg", uploadWebImage);
router.post("/mail", mail);
router.post(
  "/invite",
  validateInviteFriends,
  isRequestValidated,
  inviteFriends
);

//NOTE: delete data every day
// router.get("/temp", removeDir);
router.post("/testScrap", scrapImages);

//NOTE: notification api
router.put(
  "/fcm-token/:id",
  validateFirebaseNotification,
  isRequestValidated,
  updateFcmToken
);

//NOTE: feedback API
router.post("/feedback", validateFeedback, isRequestValidated, feedback);
// router.post(
//   "/notify",
//   validateFirebaseNotification,
//   isRequestValidated,
//   notification
// );

//NOTE: unique item url with trackable link
router.get("/item/:id", getSpecificItem);

router.post(
  "/check-url",
  validateUrlForAdultWord,
  isRequestValidated,
  urlValidationForAdultWord
);

router.get("/popularhash", getPopularHashtag);

router.get("/check-username/:username", getUsernameSuggestion);

//NOTE: All routes for country city state
router.get("/country", Country);
router.get("/state/:countryCode", State);
router.get("/city/:countryCode/:stateCode", City);

module.exports = router;
