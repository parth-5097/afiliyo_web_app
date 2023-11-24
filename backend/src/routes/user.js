const express = require("express");

const {
  isRequestValidated,
  validateRegisterRequest,
} = require("../validator/validation");
const { register, sendMessage } = require("../controllers/home/register");
const {
  dropPendingEntry,
  checkReferCode,
} = require("../middleware/middleware");
const { speedLimiter, registerLimiter } = require("../config");

const router = express.Router();
//NOTE:main routes

router.post(
  "/register",
  speedLimiter,
  registerLimiter,
  validateRegisterRequest,
  isRequestValidated,
  dropPendingEntry,
  checkReferCode,
  register,
  sendMessage
);

module.exports = router;
