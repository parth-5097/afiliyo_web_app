const { check, header, validationResult, query } = require("express-validator");
const passwordStrength = require("check-password-strength");

let d = new Date();
let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate();
let cA = new Date(year - 18, month, day).toDateString();
let cB = new Date(year - 65, month, day).toDateString();

exports.validateRegisterRequest = [
  check("phoneNumber")
    .optional()
    .isNumeric()
    .isLength({ max: 12 })
    .withMessage("phone number Should be numeric and must have valid length"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("password")
    .optional({ checkFalsy: true })
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
  check("role").exists().isString().withMessage("Enter valid role"),
  check("refer_code")
    .optional()
    .isString()
    .withMessage("Must be a valid string"),
  check("name").exists().isString(),
  check("dob", `Enter a valid date in range of ${cB} to ${cA}`)
    .exists()
    .isBefore(cA)
    .isAfter(cB),
  check("username")
    .exists()
    .withMessage("Must have some value")
    .isLength({ min: 3 })
    .withMessage("Length should atleast 3 character long"),
  check("gender").exists().isString(),
  check("interest").optional().isString().withMessage("Must be a valid string"),
];

exports.validateLoginRequest = [
  check("email")
    .optional()
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("password").optional().isString(),
  check("phoneNumber").optional().isNumeric(),
  check("fcmToken").exists().isString().withMessage("Token is required"),
];

exports.validateSocialLogin = [
  check("fcm_token").isString().exists().withMessage("Token is required"),
  check("email")
    .exists()
    .withMessage("Must have some value")
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("profile_pic_img").isURL().withMessage("Profile pic is required"),
  check("role").exists(),
];

exports.validateOtpRequest = [
  check("phoneNumber")
    .optional()
    .isNumeric()
    .isLength({ max: 12 })
    .withMessage("phone number should be numeric and must have valid length"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("code").isNumeric().withMessage("Should be numeric"),
];

exports.validateResetPasswordRequest = [
  header("Authorization")
    .exists()
    .isJWT()
    .withMessage("Provide valid login token"),
  check("oldpassword")
    .exists()
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
  check("newpassword")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
];

exports.validateUpdatePersonalInfo = [
  check("email").optional().isEmail(),
  check("phoneNumber").optional().isNumeric().isLength({ min: 10, max: 12 }),
  check("name").optional().isString(),
  check("dob", `Enter a valid date in range of ${cB} to ${cA}`)
    .optional()
    .isBefore(cA)
    .isAfter(cB),
];

exports.validateChangeRoleRequest = [
  check("username")
    .exists()
    .withMessage("Must have some value")
    .isLength({ min: 2 })
    .withMessage("Length should atleast 2 character long"),
  check("role")
    .exists()
    .withMessage("Please provide role")
    .isString()
    .withMessage("Value must be string"),
];

exports.validateAdddetailsRequest = [
  check("phoneNumber")
    .optional()
    .isNumeric()
    .withMessage("Should be numeric")
    .isLength({ max: 12 })
    .withMessage("Length must be 12 character long"),
  check("email")
    .optional()
    .exists()
    .withMessage("Must have some value")
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("name").exists().isString().withMessage("Should be String"),
  check("username")
    .exists()
    .withMessage("Must have some value")
    .isLength({ min: 3 })
    .withMessage("Length should atleast 3 character long"),
  check("dob", `Enter a valid date in range of ${cB} to ${cA}`)
    .isBefore(cA)
    .isAfter(cB),
  check("interest").optional().isString().withMessage("Must be a valid string"),
];

exports.validateForgotPasswordRequest_1 = [
  check("email")
    .exists()
    .withMessage("Must have some value")
    .isEmail()
    .withMessage("Enter the correct email address"),
];

exports.validateForgotPasswordRequest_2 = [
  query("token")
    .exists()
    .withMessage("Provide token in url")
    .isJWT()
    .withMessage("check your token"),
  check("newPassword")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
  check("confirmPassword")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
];

exports.validateSignoutRequest = [
  header("Authorization")
    .exists()
    .isJWT()
    .withMessage("Provide valid login token"),
];

exports.validateReviewRequest = [
  check("review")
    .exists()
    .withMessage("Must have some value")
    .isInt({ min: 0, max: 5 })
    .withMessage("Review must range between 0 and 5"),
  check("user_id").exists().isNumeric().withMessage("User id is require"),
];

exports.validateFollowRequest = [
  check("username").exists().withMessage("Must have some value"),
];

exports.validateCommentRequest = [
  check("msg").exists().withMessage("Must have some message to comment"),
  check("post_id").isNumeric().withMessage("Check your post id"),
  check("parent_id")
    .optional()
    .isNumeric()
    .withMessage("Check your parent comment id"),
];

exports.validateViewCommentRequest = [
  check("post_id").isNumeric().withMessage("Check your post id"),
];

exports.validateAddItemRequest = [
  check("name").exists().withMessage("Give a name to your item"),
  check("price").exists().isNumeric().withMessage("Price must be int"),
  check("link").exists().isURL().withMessage("Link must be an valid url"),
  check("category_id").isNumeric().withMessage("Check your category id"),
  check("brand_id").isNumeric().withMessage("Check your brand id"),
  check("description").optional().isString(),
];

exports.validateSaveItemRequest = [
  check("itemId").exists().isNumeric().withMessage("Check your item id"),
];

exports.validateInterestRequest = [
  check("interest").exists().withMessage("Must have some value"),
];

exports.validateFirebaseNotification = [
  check("token").exists().exists().withMessage("Token is require"),
];

exports.validateAddPostRequest = [
  check("items")
    .optional()
    .exists()
    .withMessage("Must have some value")
    .isJSON()
    .withMessage("Your items should be json"),
  check("hashtag").optional().isString().withMessage("Check your hashtag"),
  check("height")
    .exists()
    .withMessage("Must have some value")
    .isString()
    .withMessage("Height must be string"),
  check("width")
    .exists()
    .withMessage("Must have some value")
    .isString()
    .withMessage("Width must be string"),
];

exports.validateLikeSavePostRequest = [
  check("post_id").isNumeric().withMessage("Check your post id"),
];

exports.validateSharePost = [
  check("post_id").isNumeric().withMessage("Check your post id"),
  check("user_id").isNumeric().withMessage("Check your user id"),
];

exports.validateUserSavePost = [
  check("user_id").optional().isNumeric().withMessage("Check your user id"),
];

exports.validateUserSharePost = [
  check("user_id").optional().isNumeric().withMessage("Check your user id"),
];

exports.validateGetPostItems = [
  query("id").exists().isNumeric().withMessage("Check your post id"),
];

exports.validateGetBrandItems = [
  query("id").exists().withMessage("Url must have id params"),
];

exports.validateScrappRequest = [
  check("url").isURL().withMessage("Provide a valid url"),
];

exports.validateColDelRequest = [
  check("col_name")
    .isString()
    .exists()
    .withMessage("Collection name is require"),
  check("data").optional().isString().withMessage("Must be string"),
];

exports.validateFeedback = [
  check("email")
    .exists()
    .withMessage("Can not set empty")
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("subject").exists().withMessage("Can not set empty"),
  check("message")
    .exists()
    .isLength({ min: 50 })
    .withMessage("Write atleast 50 character"),
];

exports.validateOrder = [
  check("amount").isNumeric().withMessage("Must be valid Number"),
  check("currency").isCurrency().withMessage("Must be valid currency"),
  check("receipt").isString().withMessage("Receipt is require"),
];

exports.validateCapturePayment = [
  check("amount").isNumeric().withMessage("Must be valid Number"),
  check("currency").isCurrency().withMessage("Must be valid currency"),
];

exports.validateEditProfile = [
  check("name").optional().isString(),
  check("username").optional().isString(),
  check("bio").optional().isString(),
  check("sh_instagram").optional().isURL().withMessage("Must be a valid URL"),
  check("sh_facebook").optional().isURL().withMessage("Must be a valid URL"),
  check("sh_tiktok").optional().isURL().withMessage("Must be a valid URL"),
  check("sh_twitter").optional().isURL().withMessage("Must be a valid URL"),
  check("sh_youtube").optional().isURL().withMessage("Must be a valid URL"),
  check("sh_website").optional().isURL().withMessage("Must be a valid URL"),
];

exports.validateGetProfile = [query("user").optional().isString()];

exports.validateNewRole = [
  check("role").exists(),
  check("form").exists().withMessage("Must be JSON data"),
];

exports.validateAddCBCS = [check("name").exists()];

exports.validateLikeComment = [check("commentId").exists()];

exports.validateFilter = [
  check("category_id").optional().isNumeric(),
  check("brand_id").optional().isNumeric(),
  check("color_id").optional().isNumeric(),
  check("size_id").optional().isNumeric(),
  check("price").optional().isString(),
];

exports.validateCollection = [
  check("col_name").exists().isString(),
  check("data").exists().isString(),
];

exports.validateInviteFriends = [
  check("phoneNumber").exists().isMobilePhone("en-IN"),
  check("message").exists().isString(),
];

exports.validateMatchSimilar = [
  check("categoryId").optional().isNumeric(),
  check("brandId").optional().isNumeric(),
  check("colorId").optional().isNumeric(),
  check("sizeId").optional().isNumeric(),
  check("price").optional().isNumeric(),
  check("gender").optional().isString(),
];

exports.validateUpdatePost = [
  check("description").optional().isString(),
  check("items").optional().isString(),
  check("hashtag").optional().isString(),
  check("tagBrand").optional().isString(),
];

exports.validateUrlForAdultWord = [
  check("url").exists().isURL().withMessage("Must be an valid url"),
];

exports.validateReports = [
  check("post_id").optional({ checkFalsy: true }).isNumeric(),
  check("profile_id").optional({ checkFalsy: true }).isNumeric(),
  check("category").exists().isString(),
  check("form").optional({ checkFalsy: true }),
];

exports.validateBlockUnBlockProfile = [
  check("profile_id").exists().isNumeric(),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    res.json({
      success: false,
      errors: errors.errors,
      message: `${errors.errors[0].msg} for ${errors.errors[0].param}`,
    });
  } else {
    next();
  }
};
