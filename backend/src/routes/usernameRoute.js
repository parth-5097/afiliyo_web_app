const express = require("express");
const fileUpload = require("express-fileupload");

const {
  getCategory,
  getBrand,
  getColor,
  getSize,
  getAllRequestedRole,
  getAllData,
  getHashtag,
  getUserData,
} = require("../controllers/Details/getDetails");
const {
  addCategory,
  addBrand,
  addColor,
  addSize,
  addHashtag,
  editUser,
  editBlackList,
  editCategory,
  editBrand,
  editColor,
  editSize,
} = require("../controllers/Details/addDetails");
const {
  editProfile,
  editNamesProfile,
  editUsernamesProfile,
  editImages,
} = require("../controllers/profileSection/editDetails");
const {
  review,
  follow,
  unfollow,
  getFollowerList,
  getFollowingList,
} = require("../controllers/profileSection/FRF");
const {
  checkForUsername,
  checkForUploadImage,
  checkUsername,
  checkProfile,
  checkReview,
  assignNewProfile,
  addProfileVisit,
} = require("../controllers/profileSection/middleware");
const {
  validateReviewRequest,
  isRequestValidated,
  validateCommentRequest,
  validateResetPasswordRequest,
  validateSignoutRequest,
  validateChangeRoleRequest,
  validateAddPostRequest,
  validateAddItemRequest,
  validateViewCommentRequest,
  validateSharePost,
  validateLikeSavePostRequest,
  validateGetPostItems,
  validateGetBrandItems,
  validateScrappRequest,
  validateColDelRequest,
  validateOrder,
  validateCapturePayment,
  validateEditProfile,
  validateGetProfile,
  validateFollowRequest,
  validateNewRole,
  validateAddCBCS,
  validateSaveItemRequest,
  validateLikeComment,
  validateFilter,
  validateCollection,
  validateUpdatePersonalInfo,
  validateOtpRequest,
  validateMatchSimilar,
  validateUpdatePost,
  validateReports,
  validateBlockUnBlockProfile,
} = require("../validator/validation");
const {
  getProfile,
  getUserBlacklist,
} = require("../controllers/profileSection/getDetails");
const {
  uploadedImages,
  fetchImages,
} = require("../controllers/Images/uploadImages");
const { setValues } = require("../controllers/postSection/middleware");
const {
  makeComment,
  viewComments,
  likeComment,
  getCommentReply,
  blockPostComment,
  unblockPostComment,
} = require("../controllers/postSection/comments");
const { resetPassword } = require("../controllers/home/resetPassword");
const { signout } = require("../controllers/home/login");
const {
  requestNewRole,
  changeRole,
  deleteChangeRoleRequest,
} = require("../controllers/home/changeRole");
const {
  addPost,
  getPost,
  likePost,
  savePost,
  sharePost,
  getAllBrandForTag,
  getFollowingPost,
  getUserSavePost,
  getUserSharePost,
  getUserPost,
  getPopularPost,
  getLikedPost,
  getRegionPost,
  postInsight,
  editPost,
  deletePost,
  topPosts,
  getPeticularPost,
  getLikedPostUser,
  getReachPostUser,
} = require("../controllers/postSection/posts");
const {
  latestScrapImage,
  scrapImages,
} = require("../controllers/Images/scrappImages");
const {
  checkForImage,
  checkForAdminOfBrand,
} = require("../controllers/Details/middleware");
const {
  searchCatPost,
  searchHashTagRecords,
  searchSuggestedUser,
  searchHashtagPost,
  searchUserProfile,
  blockWords,
  searchInfluencer,
} = require("../controllers/Details/searchDetails");
const { saveItem } = require("../controllers/Details/saveDetails");
const {
  discovery,
  setOffset,
  filter,
} = require("../controllers/postSection/discovery");
const {
  deleteSaveItem,
  deleteSavepost,
  deleteUser,
  deleteCategory,
  deleteBrand,
  deleteColor,
  deleteSize,
} = require("../controllers/Details/deleteDetails");
const {
  allFollowerActivity,
  allLikesActivity,
  allCommentActivity,
  allMentionActivity,
  allActivity,
} = require("../controllers/activity/activity");
const {
  imageAddItems,
  urlAddItems,
  getUserItems,
  getItems,
  getPostItems,
  getBrandItems,
  getMyItems,
  getMatchItem,
  getSimilarItems,
  editItem,
  deleteItem,
} = require("../controllers/postSection/item");
const {
  addCollection,
  getCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/postSection/collection");
const {
  getAllChatUsers,
  getOldChat,
} = require("../controllers/chatSection/chat");
const { scrappProduct } = require("../controllers/Images/scrappProduct");
const { matchUrl } = require("../controllers/Images/middleware");
const {
  getOrder,
  capturePayment,
  verification,
} = require("../controllers/payment/pay_handle");
const {
  checkForOtpSend,
  checkOtpForUpdateUser,
  removeNull,
} = require("../middleware/middleware");
const { updatePersonalInfo } = require("../controllers/home/register");
const { verifyOtpForUpdateUser } = require("../controllers/home/verifyOtp");
const { stats } = require("../controllers/postSection/stats");

const {
  getReportCategory,
  addReports,
  getReports,
  editReports,
  deleteReports,
} = require("../controllers/reports/report");
const {
  getAnalytics,
  overviewAnalytics,
  videoPostcontent,
  videoTrendingVideo,
  followersContentAnalytics,
  perticularVideoPostContent,
  dateWiseUIPCount,
  genderWiseDifferenceInUIP,
} = require("../controllers/analytics/analytics");
const {
  block,
  unblock,
  getBlockeduser,
} = require("../controllers/profileSection/block&unblock");

const router = express.Router();
router.use(fileUpload());

//NOTE: update personal information in account routes
router.put(
  "/register",
  validateUpdatePersonalInfo,
  isRequestValidated,
  checkForOtpSend,
  updatePersonalInfo
);
router.get("/user", getUserData);
router.get("/fetchdata", getAllData);
router.get("/blacklist", getUserBlacklist);
router.put("/blacklist/:id", editBlackList);
router.put("/user/:id", editUser);
router.delete("/user/:id", deleteUser);
router.put(
  "/verifyotp",
  validateOtpRequest,
  isRequestValidated,
  checkOtpForUpdateUser,
  verifyOtpForUpdateUser
);

//NOTE: all routes for get My stuff page
router.get("/category", getCategory);
router.get("/brand", getBrand);
router.get("/color", getColor);
router.get("/size", getSize);
router.get("/hashtag", getHashtag);

//NOTE: all routes for add My stuff page
router.post(
  "/category",
  validateAddCBCS,
  isRequestValidated,
  checkForImage,
  addCategory
);
router.post(
  "/brand",
  validateAddCBCS,
  isRequestValidated,
  checkForAdminOfBrand,
  checkForImage,
  addBrand
);
router.post(
  "/color",
  validateAddCBCS,
  isRequestValidated,
  checkForImage,
  addColor
);
router.post(
  "/size",
  validateAddCBCS,
  isRequestValidated,
  checkForImage,
  addSize
);
router.post("/hashtag", validateAddCBCS, isRequestValidated, addHashtag);

//NOTE: All routes for editing my stuff
router.put("/category/:id", editCategory);
router.put("/brand/:id", editBrand);
router.put("/color/:id", editColor);
router.put("/size/:id", editSize);

//NOTE: All routes for deleting my stuff
router.delete("/category/:id", deleteCategory);
router.delete("/brand/:id", deleteBrand);
router.delete("/color/:id", deleteColor);
router.delete("/size/:id", deleteSize);

//NOTE: upload post routes
router.post(
  "/review",
  validateReviewRequest,
  isRequestValidated,
  checkProfile,
  checkReview,
  review
);
router.post(
  "/follow",
  validateFollowRequest,
  isRequestValidated,
  checkForUsername,
  follow
);
router.post(
  "/unfollow",
  validateFollowRequest,
  isRequestValidated,
  checkForUsername,
  unfollow
);
router.get("/follower", getFollowerList);
router.get("/following", getFollowingList);

//NOTE: all routes for profile section
router.post(
  "/profile",
  validateEditProfile,
  isRequestValidated,
  removeNull,
  editNamesProfile,
  editUsernamesProfile,
  assignNewProfile,
  editProfile
);
router.post(
  "/profile/upload",
  checkForUploadImage,
  assignNewProfile,
  editImages
);
router.get(
  "/profile",
  validateGetProfile,
  isRequestValidated,
  checkUsername,
  getProfile,
  addProfileVisit
);
router.post(
  "/profile-block",
  validateBlockUnBlockProfile,
  isRequestValidated,
  block
);
router.post(
  "/profile-unblock",
  validateBlockUnBlockProfile,
  isRequestValidated,
  unblock
);
router.get("/profile-block", getBlockeduser);

//NOTE: All routes for Items
router.post("/item", validateAddItemRequest, isRequestValidated, imageAddItems);
router.post(
  "/match-item",
  validateMatchSimilar,
  isRequestValidated,
  getMatchItem
);
router.post(
  "/similar-item",
  validateMatchSimilar,
  isRequestValidated,
  getSimilarItems
);
router.post(
  "/urlitem",
  validateAddItemRequest,
  isRequestValidated,
  urlAddItems
);
router.post("/saveitem", validateSaveItemRequest, isRequestValidated, saveItem);
router.get("/saveitem", getUserItems);
router.get("/item", getItems);
router.get("/myitem", getMyItems);
router.get("/postitem", validateGetPostItems, isRequestValidated, getPostItems);
router.get(
  "/branditem",
  validateGetBrandItems,
  isRequestValidated,
  getBrandItems
);
router.put("/item/:id", editItem);
router.delete("/item/:id", deleteItem);
router.delete(
  "/saveitem",
  validateSaveItemRequest,
  isRequestValidated,
  deleteSaveItem
);

//NOTE: All route for image scrapping
router.post(
  "/scrap",
  validateScrappRequest,
  isRequestValidated,
  latestScrapImage
);
router.post("/scrapproduct", matchUrl, scrappProduct);

//NOTE: Upload Image testing routes
// router.post("/upload", checkType, uploadedImages);
// router.get("/image", checkType, fetchImages);

//NOTE: Home route
router.post(
  "/resetpassword",
  validateResetPasswordRequest,
  isRequestValidated,
  resetPassword
);

//NOTE: all routes for comment section
router.post(
  "/comment",
  validateCommentRequest,
  isRequestValidated,
  setValues,
  makeComment
);
router.post(
  "/likecomment",
  validateLikeComment,
  isRequestValidated,
  likeComment
);
router.post(
  "/viewcomment",
  validateViewCommentRequest,
  isRequestValidated,
  viewComments
);
router.get("/replycomment/:id", getCommentReply);
router.post("/block-comment/:id", blockPostComment);
router.post("/unblock-comment/:id", unblockPostComment);

//NOTE: All route for post
router.post("/post", validateAddPostRequest, isRequestValidated, addPost);
router.get("/post", getPost);
router.get("/post/:id", getPeticularPost);
router.put(
  "/post/:id",
  validateUpdatePost,
  isRequestValidated,
  removeNull,
  editPost
);
router.delete("/post/:id", deletePost);
router.get("/userpost", getUserPost);
router.get("/followingpost", checkUsername, getFollowingPost);
router.get("/popularpost/:region", getPopularPost);
router.get("/regionpost", getRegionPost);
router.get("/savepost", getUserSavePost);
router.get("/sharepost", getUserSharePost);
router.get("/likepost", getLikedPost);
router.get("/categorypost", searchCatPost);
router.get("/hashtagpost", blockWords, searchHashtagPost);
router.post(
  "/likepost",
  validateLikeSavePostRequest,
  isRequestValidated,
  likePost
);
router.post(
  "/savepost",
  validateLikeSavePostRequest,
  isRequestValidated,
  savePost
);
router.delete("/savepost", deleteSavepost);
router.post("/sharepost", validateSharePost, isRequestValidated, sharePost);
router.get("/tagbrand", getAllBrandForTag);
router.get("/insight/:id", postInsight);
router.get("/top-post", topPosts);
router.get("/user-like/:id", getLikedPostUser);
router.get("/user-reach/:id", getReachPostUser);

//NOTE: All route for role change
router.post(
  "/changerole",
  validateChangeRoleRequest,
  isRequestValidated,
  changeRole
);
router.post("/role", validateNewRole, isRequestValidated, requestNewRole);
router.get("/role", getAllRequestedRole);
router.delete("/role/:id", deleteChangeRoleRequest);

//NOTE: All route for searching
router.post("/discovery/:region", setOffset, discovery);
router.get("/user", blockWords, searchUserProfile);
router.get("/gethashtag", blockWords, searchHashTagRecords);
router.get("/suggesteduser", checkUsername, searchSuggestedUser);
router.get("/suggested-influencer", searchInfluencer);
router.post("/filter", validateFilter, isRequestValidated, filter);

//NOTE: All route for notification
router.get("/allact", checkUsername, allActivity);
router.get("/likeact", checkUsername, allLikesActivity);
router.get("/commentact", checkUsername, allCommentActivity);
router.get("/followeract", checkUsername, allFollowerActivity);
router.get("/mentionact", checkUsername, allMentionActivity);

//NOTE: All route for collection
router.post(
  "/collection",
  validateCollection,
  isRequestValidated,
  addCollection
);
router.get("/collection", getCollection);
router.put("/collection", updateCollection);
router.delete(
  "/collection",
  validateColDelRequest,
  isRequestValidated,
  deleteCollection
);

//NOTE: All route for chat or DM
router.get("/chatusers", getAllChatUsers);
router.get("/chatload", getOldChat);

//NOTE: all razorpay routes
router.post("/order", validateOrder, isRequestValidated, getOrder);
router.post(
  "/capture/:paymentId",
  validateCapturePayment,
  isRequestValidated,
  capturePayment
);
router.post("/verification", verification);

//NOTE: All stats routes
router.get("/stats/:day", stats);

//NOTE: All routes for post reports
router.get("/reports-category", getReportCategory);
router.post("/report", validateReports, isRequestValidated, addReports);
router.get("/report", getReports);
router.put("/report/:id", validateReports, isRequestValidated, editReports);
router.delete("/report/:id", deleteReports);

//NOTE: All routes for Analytics
router.get("/analytics", getAnalytics);
router.get("/analytics-overview", overviewAnalytics);
router.get("/content-video", videoPostcontent);
router.get("/content-video/:id", perticularVideoPostContent);
router.get("/content-trending-video", videoTrendingVideo);
router.get("/content-followers", followersContentAnalytics);

//NOTE: All routes for admin analytics page
router.get("/date-uip/:day", dateWiseUIPCount);
router.get("/choice-uip", genderWiseDifferenceInUIP);

router.get("/signout", validateSignoutRequest, isRequestValidated, signout);

module.exports = router;
