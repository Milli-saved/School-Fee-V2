const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getUsers,
  editUsers,
  checkOldPassword,
  verifyEmail,
  checkSession,
  EmailVerification,
  verifyOtp,
  Mail,
  sendEmailJobApplied,
  AdminloginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// reg user
router.post("/register", registerUser);
// user login
router.post("/adminlogin", AdminloginUser);
router.post("/login", loginUser);
router.post("/sendemail", sendEmailJobApplied);
router.post("/logout", logoutUser);
// // get user info
router.get("/me", protect, getMe);
router.get("/check-session", checkSession);
// router.get('/me', protect, getMe)

router.route("/").get(protect, getUsers); // protected accessing users here ank

router.route("/changeUserPassword").put(editUsers); // ank function  /:id needed
router.route("/checkOldPassword").post(checkOldPassword);
router.route("/verifyEmail").post(verifyEmail);
router.route("/verifyOtp").post(verifyOtp);
// To verify email
router.post("/email-verification", EmailVerification);
router.get("/", Mail);

module.exports = router;
