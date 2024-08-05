/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const Crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");
const User = require("../models/userModel");
const validator = require("validator");
const Notification = require("../models/notificationModel");
// @desc Get schools
// @route GET /api/schools
// @ access Private
const getSchool = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const schoolId = validator.escape(validator.trim(req.params.id));
  const school = await School.findById(schoolId);
  res.status(200).json(school);
});

// @desc Get schools
// @route GET /api/schools
// @ access Private
const getSchools = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const userId = validator.escape(validator.trim(req.user._id.toString()));
  const schools = await School.find({ user: userId });
  res.status(200).json(schools);
});
const getAllSchools = asyncHandler(async (req, res) => {
  // find school only by logged in user
  const schools = await School.find();
  res.status(200).json(schools);
});
const getOneSchool = asyncHandler(async (req, res) => {
  const schoolId = validator.escape(validator.trim(req.params.id));
  const school = await School.findById({ schoolId });
  res.status(200).json(school);
});

const getOneSchoolForAdmin = asyncHandler(async (req, res) => {
  const schoolId = validator.escape(validator.trim(req.params.id));
  const school = await School.findOne({ schoolId });
  res.status(200).json(school);
});

const findNetPayment = asyncHandler(async (req, res) => {
  console.log("yes i'm here");
  console.log("req.body: ", req.body);
});

// @desc Set schools
// @route SET /api/schools
// @ access Private

const setSchools = asyncHandler(async (req, res) => {
  const userId = validator.escape(validator.trim(req.body.user._id));
  const schoolId = req.body.schoolId;
  const schoolName = validator.escape(validator.trim(req.body.schoolName));
  const schoolEmail = validator.escape(validator.trim(req.body.schoolEmail));
  const schoolCity = validator.escape(validator.trim(req.body.schoolCity));
  const schoolSubcity = validator.escape(
    validator.trim(req.body.schoolSubcity)
  );
  const schoolLevel = validator.escape(validator.trim(req.body.schoolLevel));
  const schoolPhone = validator.escape(validator.trim(req.body.schoolPhone));
  const schoolKebele = validator.escape(validator.trim(req.body.schoolKebele));
  const schoolWoreda = validator.escape(validator.trim(req.body.schoolWoreda));
  const schoolCbeMerchantCode = validator.escape(
    validator.trim(req.body.schoolCbeMerchantCode)
  );
  const schoolCbeAccountNumber = validator.escape(
    validator.trim(req.body.schoolCbeAccountNumber)
  );
  let socialLinks = req.body.socialLink;
  let sanitizedLinks = [];
  if (socialLinks.length) {
    sanitizedLinks = socialLinks.map((link) =>
      validator.escape(validator.trim(link))
    );
  } else {
    sanitizedLinks = req.body.socialLink;
  }

  // generate random school id
  function getNumber() {
    return new Promise((resolve, reject) => {
      const generateRandomNumber = () =>
        (Crypto.randomBytes(4).readUInt32BE(0) % 10000000)
          .toString()
          .padStart(7, "0");

      const attemptToFindUniqueNumber = () => {
        const n = generateRandomNumber();
        School.findOne({ schoolId: n }, (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            attemptToFindUniqueNumber();
          } else {
            resolve(n);
          }
        });
      };
      attemptToFindUniqueNumber();
    });
  }

  getNumber()
    .then((number) => number)
    .catch((err) => {
      console.err("Error: ", err);
    });

  const value = await getNumber();
  console.log("userId: ", userId);
  console.log("value(schoolId): ", value);
  console.log("schoolName: ", schoolName);
  console.log("schoolEmail: ", schoolEmail);
  console.log("schoolCity: ", schoolCity);
  console.log("schoolSubcity: ", schoolSubcity);
  console.log("schoolLevel: ", schoolLevel);
  console.log("schoolPhone: ", schoolPhone);
  console.log("schoolKebele: ", schoolKebele);
  console.log("schoolWoreda: ", schoolWoreda);
  console.log("schoolWoreda: ", schoolWoreda);
  console.log("schoolCbeMerchantCode: ", schoolCbeMerchantCode);
  console.log("schoolCbeAccountNumber: ", schoolCbeAccountNumber);
  console.log("sanitizedLinks: ", sanitizedLinks);
  try {
    const school = await School.create({
      user: userId,
      schoolId: value,
      schoolName: schoolName,
      schoolEmail: schoolEmail,
      schoolCity: schoolCity,
      schoolSubcity: schoolSubcity,
      schoolLevel: schoolLevel,
      schoolPhone: schoolPhone,
      schoolKebele: schoolKebele,
      schoolWoreda: schoolWoreda,
      schoolCbeMerchantCode: schoolCbeMerchantCode,
      schoolCbeAccountNumber: schoolCbeAccountNumber,
      link: sanitizedLinks,
    });
    await Notification.create({
      header: "School Created",
      content: `You have  Registerd your school to CbePay. You can now view and edit it.`,
      user: userId,
    });
    console.log("succeeded on creating school.");
    res.status(200).json(school);
  } catch (error) {
    console.log("failed on creating school: ");
    console.log(error);
    res.status(500).json(error);
  }
});

// @desc Update schools
// @route PUT /api/schools
// @ access Private
const updateSchools = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);

  if (!school) {
    res.status(400);
    throw new Error("School not found");
  }
  const schoolName = validator.escape(validator.trim(req.body.schoolName));
  const schoolEmail = validator.escape(validator.trim(req.body.schoolEmail));
  const schoolLevel = validator.escape(validator.trim(req.body.schoolLevel));
  const schoolPhone = validator.escape(validator.trim(req.body.schoolPhone));
  const schoolKebele = validator.escape(validator.trim(req.body.schoolKebele));
  const schoolCity = validator.escape(validator.trim(req.body.schoolCity));
  const schoolSubcity = validator.escape(
    validator.trim(req.body.schoolSubcity)
  );

  const schoolWoreda = validator.escape(validator.trim(req.body.schoolWoreda));
  const schoolCbeMerchantCode = validator.escape(
    validator.trim(req.body.schoolCbeMerchantCode)
  );
  const schoolCbeAccountNumber = req.body.schoolCbeAccountNumber;
  let socialLinks = req.body.socialLink;
  let socialLink = [];
  if (socialLinks.length) {
    socialLinks.map((link) => {
      const social = validator.escape(validator.trim(link.url));
      socialLink.push({ Website: link.link, url: social });
    });
  } else {
    socialLink = req.body.socialLink;
  }

  const request = {
    schoolName,
    schoolEmail,
    schoolLevel,
    schoolPhone,
    schoolKebele,
    schoolCity,
    schoolSubcity,
    schoolWoreda,
    schoolCbeMerchantCode,
    schoolCbeAccountNumber,
    socialLink,
    schoolAchievements: req.body.schoolAchievements,
    annualPeriod: req.body.annualPeriod,
    schoolPaymentGroups: req.body.schoolPaymentGroups,
    schoolGrade: req.body.schoolGrade,
    educationalDivisions: req.body.educationalDivisions,
    discounts: req.body.discounts,
  };
  const updatedSchool = await School.findByIdAndUpdate(req.params.id, request, {
    new: true,
  });
  res.status(200).json(updatedSchool);
});

// @desc Delete schools
// @route DELETE /api/schools
// @ access Private
const deleteSchools = asyncHandler(async (req, res) => {
  const sanitizedId = validator.escape(validator.trim(req.params.id));
  const school = await School.findById(sanitizedId);

  if (!school) {
    res.status(400);
    throw new Error("School not found");
  }
  if (!school) {
    res.status(400);
    throw new Error("School not found");
  }
  const sanitizedUserId = validator.escape(validator.trim(req.user.id));
  const user = await User.findById(sanitizedUserId);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user Not Found");
  }
  // make sure the logged in user mathced the schools user
  if (school.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  await school.remove();
  res.status(200).json({ id: req.params.id });
});
const editSchools = asyncHandler(async (req, res) => {
  const {
    schoolName,
    schoolLevel,
    schoolPhone,
    schoolEmail,
    schoolId,
    schoolCity,
    schoolSubcity,
    schoolWoreda,
    merchantCode,
    accountNumber,
  } = req.body;

  const sanitizedSchoolId = validator.escape(validator.trim(schoolId));
  console.log("so sanitizedSchoolId: ", sanitizedSchoolId);

  const school = await School.findOne({ schoolId: sanitizedSchoolId });

  if (!school) {
    res.status(400);
    throw new Error("School not found");
  }

  const sanitizedUser = validator.escape(validator.trim(req.body.id));
  const user = await User.findById(sanitizedUser);
  // check for user
  if (!user) {
    res.status(401);
    throw new Error("user Not Found");
  }

  // make sure the logged in user mathced the schools user
  if (school.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("user not authorized");
  }
  // const foundSchool = await School.find({ schoolId: req.params.id });

  const updateSchool = {
    schoolName: validator.escape(validator.trim(schoolName)),
    schoolLevel: validator.escape(validator.trim(schoolLevel)),
    schoolPhone: validator.escape(validator.trim(schoolPhone)),
    schoolEmail: validator.escape(validator.trim(schoolEmail)),
    schoolCity: validator.escape(validator.trim(schoolCity)),
    schoolSubcity: validator.escape(validator.trim(schoolSubcity)),
    schoolWoreda: validator.escape(validator.trim(schoolWoreda)),
    merchantCode: validator.escape(validator.trim(merchantCode)),
    accountNumber: validator.escape(validator.trim(accountNumber)),
  };

  school.schoolName = await updateSchool.schoolName;
  school.schoolLevel = await updateSchool.schoolLevel;
  school.schoolPhone = await updateSchool.schoolPhone;
  school.schoolEmail = await updateSchool.schoolEmail;
  school.schoolCity = await updateSchool.schoolCity;
  school.schoolSubcity = await updateSchool.schoolSubcity;
  school.schoolWoreda = await updateSchool.schoolWoreda;
  school.schoolCbeMerchantCode = await updateSchool.merchantCode;
  school.schoolCbeAccountNumber = await updateSchool.accountNumber;

  await school.save();
  const sanitizedusersId = validator.escape(validator.trim(req.user.id));
  const schools = await School.find({ user: sanitizedusersId });

  res.status(200).json(schools);
});

const getSchoolOfTheUser = asyncHandler(async (req, res) => {
  const school = await School.find({ user: req.body.userId });
  console.log("the school: ", school);
});

module.exports = {
  getSchools,
  setSchools,
  updateSchools,
  deleteSchools,
  getSchool,
  getAllSchools,
  getOneSchool,
  editSchools,
  findNetPayment,
  getSchoolOfTheUser,
  getOneSchoolForAdmin,
};
