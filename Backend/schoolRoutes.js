const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getSchools,
  setSchools,
  updateSchools,
  deleteSchools,
  getAllSchools,
  getSchool,
  getOneSchool,
  editSchools,
  findNetPayment,
  getOneSchoolForAdmin
} = require("../controllers/schoolController");

router
  .route("/")
  // .get(protect, getSchools)
  .get(protect, getSchools)
  .post(protect, setSchools);
router
  .route("/payment/:schoolId/:studentId")
  .post(findNetPayment)
  .put(protect, editSchools);
// .put(protect, updateSchools);
router.route("/all").get(getAllSchools);
router.route("/:id").get(getOneSchool);
router.route("/admin/:id").get(getOneSchoolForAdmin)
router.route("/:id").put(updateSchools).delete(protect, deleteSchools);
router.route("/find/:id").get(getSchool);

module.exports = router;
