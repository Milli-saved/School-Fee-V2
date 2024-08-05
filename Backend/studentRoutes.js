const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { protectStudents } = require("../middleware/protectStudents");

const {
  getStudents,
  setStudents,
  updateStudents,
  deleteStudents,
  getAllStudents,
  getStudent,
  getOneStudent,
  registerBulkStudents,
  getStudentPaymentDetails,
  findStudentByPhonenumber,
  updateStudentById,
  addPaymentTypes,
  getStudentsAndSchoolOfGrades,
} = require("../controllers/studentController");

router.route("/getgrade/").get(getStudentsAndSchoolOfGrades);
router
  .route("/")
  // .get(protect, getStudents)
  .get(getStudents)
  .post(protect, setStudents)
  .put(updateStudents);
router.route("/all").get(getAllStudents);
router.route("/registerBulkStudents").post(protect, registerBulkStudents);
// router.route('/register/:id').post(protect, setStudents)

router.route("/:id").delete(protect, deleteStudents);
router
  .route("/:id")
  .put(protect, updateStudents)
  .delete(protect, deleteStudents)
  .get(getOneStudent);
router
  .route("/payments/:schoolId/:studentId/:showAllPayments?")
  .get(getStudentPaymentDetails);
router.route("/find/:id").get(getStudent);
router.route("/update_student").post(updateStudentById);
router.route("/phone_search").post(findStudentByPhonenumber);
router.route("/add_payment_types").post(addPaymentTypes);
module.exports = router;
