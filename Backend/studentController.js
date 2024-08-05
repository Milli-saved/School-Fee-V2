/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const School = require("../models/schoolModel");
const User = require("../models/userModel");
const validator = require("validator");
const { AgInputNumberField } = require("@ag-grid-community/core");
const { loginUser } = require("./userController");

// @desc Get students
// @route GET /api/students
// @ access Private

const getStudentsAndSchoolOfGrades = asyncHandler(async (req, res) => {
  const grade = req.headers["grade"];
  const schoolId = req.headers["schoolid"];
  console.log("both grade and school: ", grade, schoolId);
  const students = await Student.find({});
  let filteredStudents = [];
  students.map((eachStudent, key) => {
    if (eachStudent.schoolId == schoolId && eachStudent.studentGrade == grade) {
      filteredStudents.push(eachStudent);
    }
  });
  res.status(200).json({ students: filteredStudents });
});

const getStudents = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const sanitizedUserId = validator.escape(validator.trim(req.user.id));
  const students = await Student.find({ user: sanitizedUserId });
  res.status(200).json(students);
});

const getAllStudents = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const students = await Student.find();
  res.status(200).json(students);
});
const getOneStudent = asyncHandler(async (req, res) => {
  const sanitizedStudentId = validator.escape(validator.trim(req.params.id));
  const student = await Student.findById(sanitizedStudentId);
  res.status(200).json(student);
});

const getOneStudentForPayment = asyncHandler(async (req, res) => {
  const sanitizedStudentId = validator.escape(validator.trim(req.params.id));
  const student = await Student.find({ studentIdNumber: sanitizedStudentId });
  if (student.length === 0) {
    res.status(404);
    throw new Error("No Student Found.");
  } else {
    res.status(200).json(student);
  }
});

const calculateCurrentEligiblePeriod = (period) => {
  // get date range b/n period start and period end dates
  // get current date
  // if (current date is witin the range of perid start and end dates) return its index
};

const getSchoolData = async (schoolId) => {
  // get school data
  const school = await School.find({ schoolId: schoolId });
  const isBasedonAnnualPeriod =
    school[0]?.schoolPaymentGroups[0].isBasedOnAnnualPeriod;
  const isBasedOnTopLevelAnnualPeriod =
    school[0]?.schoolPaymentGroups[0].isBasedOnTopLevelAnnualPeriod;
  const isBasedOnSubAnnualPeriod =
    school[0]?.schoolPaymentGroups[0].isBasedOnSubAnnualPeriod;
  const annualPeriods = school[0]?.annualPeriod;
  if (annualPeriods) {
    annualPeriods.forEach((period, index) => {
      const startDate = new Date(period.periodStartDate);
      const endDate = new Date(period.periodEndDate);
      const currentDate = new Date();

      let currentDateIndex;
      let dateExpired = false;
      let penalize = false;
      if (currentDate >= startDate && endDate <= endDate) {
        currentDateIndex = index;
      } else {
        dateExpired = true;
      }
      // check penality status here
      const dateDetails = {
        currentDateIndex,
        dateExpired,
      };
      return index;
    });
  }

  // const periodStart = isBasedOnSubAnnualPeriod ? annualPeriods.forEach(period => {
  //   const startDate = new Date(period.periodStartDate)
  //   const endDate = new Date(period.periodEndDate)
  // })

  const periodLength = isBasedOnSubAnnualPeriod ? annualPeriods.length : 0;
  const schoolData = {
    isBasedonAnnualPeriod,
    isBasedOnTopLevelAnnualPeriod,
    isBasedOnSubAnnualPeriod,
    annualPeriods,
    periodLength,
  };

  return schoolData;
};

const getStudentPaymentDetails = asyncHandler(async (req, res) => {
  const { studentId, schoolId, showAllPayments } = req.params;
  console.log("req.params ", req.params);

  // find the student by student and school id
  const student = await Student.find({
    studentIdNumber: studentId,
    schoolId: schoolId,
  });

  console.log(studentId);
  console.log(schoolId);
  console.log(showAllPayments);

  !showAllPayments &&
    student.forEach((singleStudent) => {
      singleStudent.paymentsForStudent.forEach((payment) => {
        payment.typeAndAmount = payment.typeAndAmount.filter(
          (type) => type.status === "Not Paid"
        );
      });
    });

  // get the school data
  const schoolData = getSchoolData(schoolId);

  if (student.length === 0) {
    res.status(404).json({ message: "No Student Found!" });
    return;
    // throw new Error("No Student Found.");
  } else if (student[0].schoolId != schoolId) {
    res.status(400).json({ message: "Student is not in this school." });
    // throw new Error("Student is not in this school.");
  } else {
    console.log("sending the student ..............");
    res.status(200).json({ student, schoolData });
  }
});

const findStudentByPhonenumber = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const student = await Student.find({ guardianPhoneNumber: phoneNumber });
    console.log("student: ", student);
    let message = "";
    // finding the school by student id:
    let currentId = student[0]?.schoolId;
    const school = await School.find({ schoolId: currentId });
    const isBasedonAnnualPeriod =
      school[0]?.schoolPaymentGroups[0].isBasedOnAnnualPeriod;
    const isBasedOnTopLevelAnnualPeriod =
      school[0]?.schoolPaymentGroups[0].isBasedOnTopLevelAnnualPeriod;
    const isBasedOnSubAnnualPeriod =
      school[0]?.schoolPaymentGroups[0].isBasedOnSubAnnualPeriod;
    const annualPeriods = school[0]?.annualPeriod;

    const periodLength = isBasedOnSubAnnualPeriod ? annualPeriods.length : 0;
    const schoolData = {
      isBasedonAnnualPeriod,
      isBasedOnTopLevelAnnualPeriod,
      isBasedOnSubAnnualPeriod,
      annualPeriods,
      periodLength,
    };

    if (student.length === 0) {
      message = "No student found!";
    }

    console.log("student: ", student);
    console.log("the st.scId: ", student.schoolId);
    // const school = await School.find({ schoolId: student.schoolId });
    console.log("school.length === 0: ", school.length === 0);
    console.log("student.length === 0: ", student.length === 0);
    let result = {
      student: student.length === 0 ? null : student,
      school: school.length === 0 ? null : school,
      message: student.length === 0 ? "No Student Found!" : "",
    };
    res.status(200).json({ result, schoolData });
  } catch (error) {
    res.status(500).json({ message: "Network Error! Please try again." });
  }
});

// GET A STUDENT
const getStudent = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const sanitizedStudentId = validator.escape(validator.trim(req.params.id));
  const student = await Student.findById(sanitizedStudentId);
  res.status(200).json(student);
});

const updateStudentById = asyncHandler(async (req, res) => {
  const {
    studentId,
    schoolId,
    transactionId,
    periodIndex,
    paymentIndex,
    payAllEligiblePaymentsAtOnce,
  } = req.body;

  const student = await Student.findOne({
    studentIdNumber: studentId,
    schoolId,
  });

  try {
    if (student) {
      const period = student.paymentsForStudent[periodIndex];

      if (period) {
        if (payAllEligiblePaymentsAtOnce) {
          period.typeAndAmount = period.typeAndAmount.map((payment) => ({
            ...payment,
            status: "Paid",
          }));
        } else {
          if (period.typeAndAmount[paymentIndex]) {
            period.typeAndAmount[paymentIndex].status = "Paid";
            await student.save();
          }
        }
        student.studentFatherName = "Momo";
        const savedStudent = await student.save();
        console.log(savedStudent);
      } else {
        console.log("Invalid period index");
      }
    } else {
      console.log("Student not found");
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const addPaymentTypes = asyncHandler(async (req, res) => {
  console.log("adding payment types! ", req.body);
  const { studentIdNumber, schoolId } = req.body;

  const student = await Student.findOne({
    studentIdNumber,
    schoolId,
  });

  try {
    if (student) {
      const length = student.paymentsForStudent[0].typeAndAmount.length;
      let paymentData = {
        id: length,
        paymentType: `Payment ${length}`,
        amount: length,
        grossAmount: length.toString(),
        status: "Not Paid",
      };
      console.log("payment data ", paymentData);
      student.paymentsForStudent[0].typeAndAmount.push(paymentData);
    }
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
});

// @desc Set students
// @route SET /api/students
// @ access Private
const setStudents = asyncHandler(async (req, res) => {
  const sanitizedStudentId = req.body.studentIdNumber
    ? Number(
        validator.escape(validator.trim(req.body.studentIdNumber.toString()))
      )
    : "";
  // const studentID = req.body.studentIdNumber;
  const studentExists = await Student.findOne({
    studentIdNumber: sanitizedStudentId,
  });
  if (studentExists) {
    const duplicateItems = [];
    duplicateItems.push(studentExists);
    res.status(409);
    throw new Error(`${JSON.stringify(duplicateItems)}`);
  }
  const sanitizedSchoolId = req.body.schoolId
    ? validator.escape(validator.trim(req.body.schoolId))
    : "";
  const selectedSchool = await School.findOne({
    schoolId: sanitizedSchoolId,
  });

  const paymentTypesAndAmount = [];
  selectedSchool.schoolPaymentGroups.forEach((eachSchoolPaymentGroup) => {
    eachSchoolPaymentGroup.paymentTypesAndAmounts.forEach(
      (eachPaymentTypeAndAmount) => {
        if (eachPaymentTypeAndAmount.grade == req.body.studentGrade) {
          paymentTypesAndAmount.push(eachPaymentTypeAndAmount);
        }
      }
    );
  });

  const sanitizedUser = req.user.id
    ? validator.escape(validator.trim(req.user.id))
    : "";
  const sanitizedSchoolObjectId = req.body.Id
    ? validator.escape(validator.trim(req.body.Id))
    : "";
  const sanitizedScoolId = req.body.schoolId
    ? validator.escape(validator.trim(req.body.schoolId))
    : "";
  const sanitizedSchoolName = req.body.schoolName
    ? validator.escape(validator.trim(req.body.schoolName))
    : "";
  const sanitizedStudentDateOfBirth = req.body.studentDateOfBirth
    ? validator.escape(validator.trim(req.body.studentDateOfBirth))
    : "";
  const sanitizedEmailAddress = req.body.studentEmailAddress
    ? validator.escape(validator.trim(req.body.studentEmailAddress))
    : "";
  const sanitizedFatherName = validator.escape(
    validator.trim(req.body.studentFatherName)
  );
  const sanitizedFirstName = req.body.studentFirstName
    ? validator.escape(validator.trim(req.body.studentFirstName))
    : req.body.studentFirstName;
  const sanitizedStudentGender = req.body.studentGender
    ? validator.escape(validator.trim(req.body.studentGender))
    : "";
  const sanitizedGrandFatherName = req.body.studentGrandFathersName
    ? validator.escape(validator.trim(req.body.studentGrandFathersName))
    : "";

  const sanitizedStudentPhoneNumber = req.body.studentPhoneNumber
    ? validator.escape(validator.trim(req.body.studentPhoneNumber))
    : "";
  const sanitizedPlaceOfBirth = req.body.studentPlaceOfBirth
    ? validator.escape(validator.trim(req.body.studentPlaceOfBirth))
    : "";
  const sanitizedPrefferedSoclialMediaLink = req.body
    .studentPrefferedSocialMediaLink
    ? validator.escape(validator.trim(req.body.studentPrefferedSocialMediaLink))
    : "";
  const sanitizedGuardianFirstName = req.body.guardianFirstName
    ? validator.escape(validator.trim(req.body.guardianFirstName))
    : "";
  const sanitizedGuardianLastName = req.body.guardianLastName
    ? validator.escape(validator.trim(req.body.guardianLastName))
    : "";
  const sanitizedGuardianSurName = req.body.guardianSurName
    ? validator.escape(validator.trim(req.body.guardianSurName))
    : "";
  const sanitizedGuardianEmailAddress = req.body.guardianEmailAddress
    ? validator.escape(validator.trim(req.body.guardianEmailAddress))
    : "";
  const sanitizedGuardianPhoneNumber = req.body.guardianPhoneNumber
    ? validator.escape(validator.trim(req.body.guardianPhoneNumber))
    : "";
  const sanitizedStudentGrade = req.body.studentGrade
    ? validator.escape(validator.trim(req.body.studentGrade))
    : "";
  // const sanitizedDiscountForStudent = validator.escape(
  //   validator.trim(req.body.discountForStudent)
  // );

  // const sanitizedPaymentHistory = validator.escape(
  //   validator.trim(req.body.paymentHistory)
  // );
  const student = await Student.create({
    user: sanitizedUser,
    schoolObjectId: sanitizedSchoolObjectId,
    schoolId: sanitizedScoolId,
    schoolName: sanitizedSchoolName,
    studentDateOfBirth: sanitizedStudentDateOfBirth,
    studentEmailAddress: sanitizedEmailAddress,
    studentFatherName: sanitizedFatherName,
    studentFirstName: sanitizedFirstName,
    studentGender: sanitizedStudentGender,
    studentGrandFathersName: sanitizedGrandFatherName,
    studentIdNumber: sanitizedStudentId,
    studentPhoneNumber: sanitizedStudentPhoneNumber,
    studentPlaceOfBirth: sanitizedPlaceOfBirth,
    studentPrefferedSocialMediaLink: sanitizedPrefferedSoclialMediaLink,
    guardianFirstName: sanitizedGuardianFirstName,
    guardianLastName: sanitizedGuardianLastName,
    guardianSurName: sanitizedGuardianSurName,
    guardianPhoneNumber: sanitizedGuardianPhoneNumber,
    guardianEmailAddress: sanitizedGuardianEmailAddress,
    studentGrade: sanitizedStudentGrade,
    paymentsForStudent: paymentTypesAndAmount,
    discountForStudent: req.body.discountForStudent,
    paymentHistory: req.body.paymentHistory,
  });
  const school = await School.findById(student.schoolId);
  await School.findByIdAndUpdate(school._id, {
    $push: { students: student },
  });
  res.status(200).json(student);
});

// @desc Update students
// @route PUT /api/students
// @ access Private
const registerBulkStudents = asyncHandler(async (req, res) => {
  const AllStudents = req.body;
  const duplicatedStudents = [];
  Promise.all(
    AllStudents.map(async (onestudent) => {
      const sanitizedStudentId = onestudent.studentIdNumber
        ? Number(
            validator.escape(
              validator.trim(onestudent.studentIdNumber.toString())
            )
          )
        : "";
      // const studentID = req.body.studentIdNumber;
      const studentExists = await Student.findOne({
        studentIdNumber: sanitizedStudentId,
      });
      if (studentExists) {
        duplicatedStudents.push(studentExists);
      } else {
        const sanitizedSchoolId = onestudent.schoolId
          ? validator.escape(validator.trim(onestudent.schoolId))
          : "";
        const selectedSchool = await School.findOne({
          schoolId: sanitizedSchoolId,
        });

        const paymentTypesAndAmount = [];
        selectedSchool.schoolPaymentGroups.forEach((eachSchoolPaymentGroup) => {
          eachSchoolPaymentGroup.paymentTypesAndAmounts.forEach(
            (eachPaymentTypeAndAmount) => {
              if (eachPaymentTypeAndAmount.grade === student.studentGrade) {
                paymentTypesAndAmount.push(eachPaymentTypeAndAmount);
              }
            }
          );
        });
        const sanitizedUser =
          req && req.user && req.user.id
            ? validator.escape(validator.trim(req.user.id))
            : "";
        const sanitizedSchoolObjectId = onestudent.Id
          ? validator.escape(validator.trim(onestudent.Id))
          : "";
        const sanitizedScoolId = onestudent.schoolId
          ? validator.escape(validator.trim(onestudent.schoolId))
          : "";
        const sanitizedSchoolName = onestudent.schoolName
          ? validator.escape(validator.trim(onestudent.schoolName))
          : "";
        const sanitizedStudentDateOfBirth = onestudent.studentDateOfBirth
          ? validator.escape(validator.trim(onestudent.studentDateOfBirth))
          : "";
        const sanitizedEmailAddress = onestudent.studentEmailAddress
          ? validator.escape(validator.trim(onestudent.studentEmailAddress))
          : "";
        const sanitizedFatherName = validator.escape(
          validator.trim(onestudent.studentFatherName)
        );
        const sanitizedFirstName = onestudent.studentFirstName
          ? validator.escape(validator.trim(onestudent.studentFirstName))
          : onestudent.studentFirstName;
        const sanitizedStudentGender = onestudent.studentGender
          ? validator.escape(validator.trim(onestudent.studentGender))
          : "";
        const sanitizedGrandFatherName = onestudent.studentGrandFathersName
          ? validator.escape(validator.trim(onestudent.studentGrandFathersName))
          : "";

        const sanitizedStudentPhoneNumber = onestudent.studentPhoneNumber
          ? validator.escape(validator.trim(onestudent.studentPhoneNumber))
          : "";
        const sanitizedPlaceOfBirth = onestudent.studentPlaceOfBirth
          ? validator.escape(validator.trim(onestudent.studentPlaceOfBirth))
          : "";
        const sanitizedPrefferedSoclialMediaLink = req.body
          .studentPrefferedSocialMediaLink
          ? validator.escape(
              validator.trim(onestudent.studentPrefferedSocialMediaLink)
            )
          : "";
        const sanitizedGuardianFirstName = onestudent.guardianFirstName
          ? validator.escape(validator.trim(onestudent.guardianFirstName))
          : "";
        const sanitizedGuardianLastName = onestudent.guardianLastName
          ? validator.escape(validator.trim(onestudent.guardianLastName))
          : "";
        const sanitizedGuardianSurName = onestudent.guardianSurName
          ? validator.escape(validator.trim(onestudent.guardianSurName))
          : "";
        const sanitizedGuardianEmailAddress = onestudent.guardianEmailAddress
          ? validator.escape(validator.trim(onestudent.guardianEmailAddress))
          : "";
        const sanitizedGuardianPhoneNumber = onestudent.guardianPhoneNumber
          ? validator.escape(validator.trim(onestudent.guardianPhoneNumber))
          : "";
        const sanitizedStudentGrade = onestudent.studentGrade
          ? validator.escape(validator.trim(onestudent.studentGrade))
          : "";
        const student = await Student.create({
          user: sanitizedUser,
          schoolObjectId: sanitizedSchoolObjectId,
          schoolId: sanitizedScoolId,
          schoolName: sanitizedSchoolName,
          studentDateOfBirth: sanitizedStudentDateOfBirth,
          studentEmailAddress: sanitizedEmailAddress,
          studentFatherName: sanitizedFatherName,
          studentFirstName: sanitizedFirstName,
          studentGender: sanitizedStudentGender,
          studentGrandFathersName: sanitizedGrandFatherName,
          studentIdNumber: sanitizedStudentId,
          studentPhoneNumber: sanitizedStudentPhoneNumber,
          studentPlaceOfBirth: sanitizedPlaceOfBirth,
          studentPrefferedSocialMediaLink: sanitizedPrefferedSoclialMediaLink,
          guardianFirstName: sanitizedGuardianFirstName,
          guardianLastName: sanitizedGuardianLastName,
          guardianSurName: sanitizedGuardianSurName,
          guardianPhoneNumber: sanitizedGuardianPhoneNumber,
          guardianEmailAddress: sanitizedGuardianEmailAddress,
          studentGrade: sanitizedStudentGrade,
          paymentsForStudent: paymentTypesAndAmount,
          discountForStudent: req.body.discountForStudent,
          paymentHistory: req.body.paymentHistory,
        });
      }
    })
  ).then(() => {
    if (duplicatedStudents.length) {
      res.status(409).json(duplicatedStudents);
      // throw new Error(duplicatedStudents);
    } else {
      res.status(200).json(AllStudents);
    }
  });
});
const updateStudents = asyncHandler(async (req, res) => {
  const sanitizedFirstName = validator.escape(
    validator.trim(req.body.FirstName)
  );
  const sanitizedMiddleName = validator.escape(
    validator.trim(req.body.MiddleName)
  );
  const sanitizedLastName = validator.escape(validator.trim(req.body.LastName));
  const sanitizedGender = validator.escape(validator.trim(req.body.Gender));
  const sanitizedIdNumber = validator.escape(validator.trim(req.body.IdNumber));

  const studentRegistered = await Student.findOne({
    studentIdNumber: sanitizedIdNumber,
  });
  if (studentRegistered) {
    const update = {
      studentFirstName: sanitizedFirstName,
      studentFatherName: sanitizedMiddleName,
      studentGrandFathersName: sanitizedLastName,
      studentGender: sanitizedGender,
    };
    studentRegistered.studentFirstName = await update.studentFirstName;
    studentRegistered.studentFatherName = await update.studentFatherName;
    studentRegistered.studentGrandFathersName =
      await update.studentGrandFathersName;
    studentRegistered.studentGender = await update.studentGender;

    await studentRegistered.save();
    const students = await Student.find();
    res.status(200).json(students);
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

// @desc Delete students
// @route DELETE /api/students
// @ access Private
const deleteStudents = asyncHandler(async (req, res) => {
  const sanitizedId = validator.escape(validator.trim(req.params.id));
  const student = await Student.findById(sanitizedId);
  const studentsSchool = await School.findById(student.schoolId);

  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }
  const user = await User.findById(req.user.id);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user Not Found");
  }
  // make sure the logged in user mathced the students user
  if (student.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  // remove the student from his school
  await School.findByIdAndUpdate(studentsSchool._id, {
    $pull: { students: student },
  });
  // remove the student from students route
  await student.remove();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getStudents,
  setStudents,
  updateStudentById,
  updateStudents,
  deleteStudents,
  getAllStudents,
  getStudent,
  getOneStudent,
  getOneStudentForPayment,
  registerBulkStudents,
  getStudentPaymentDetails,
  findStudentByPhonenumber,
  addPaymentTypes,
  getStudentsAndSchoolOfGrades,
};
