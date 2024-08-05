/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const path = require("path");
const crypto = require("crypto");
const cron = require("node-cron");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const validator = require("validator");
const NodeCache = require("node-cache");
const fs = require("fs");
const Token = require("../models/tokenModel");
const { CLIENT_RENEG_LIMIT } = require("tls");
const { log } = require("console");

const CacheStorage = new NodeCache();

const Mail = asyncHandler(async (req, res) => {
  // emailService.sendMail(
  //   "MillionTenkir@cbe.com.et",
  //   "School FEE",
  //   "This is from school fee system."
  // );
  // res.json({ msg: "hello" });
  console.log("hey end now");
  const transporter = nodemailer.createTransport({
    host: "smtpa.cbe.com.et",
    port: 25,
    secure: false,
  });
  // Email content
  const mailOptions = {
    from: "SchoolFeePayments@cbe.com.et",
    to: "kennataddese@cbe.com.et",
    subject: "Email Verification",
    text: "Hello, this is a test email from Node.js!",
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error", error.message);
      console.error("Error stack:", error?.stack);
    } else {
      console.log("Email sent:", info.response);
    }
  });
});

// Background Process

async function deleteUnverifiedUsers() {
  // Get all unverified users
  const unverifiedUsers = await User.find({ verified: false });

  // Get current time
  const currentTime = new Date();

  // Iterate over all unverified users
  for (const user of unverifiedUsers) {
    // Check if more than 24 hours have passed since the user signed up
    if (currentTime - user.createdAt > 24 * 60 * 60 * 1000) {
      // Delete user and send notification
      await User.deleteOne({ _id: user._id });
    }
  }
}
// Schedule a job to run every hour
cron.schedule(
  "0 * * * *",
  async () => {
    await deleteUnverifiedUsers();
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
    // expiresIn: 1,
    // expiresIn: "10s",
  });

const verificationToken = crypto.randomBytes(20).toString("hex");

const sendEmailJobApplied = asyncHandler(async (req, res) => {
  console.log("I have entered send email");
  console.log("the req.body: ", req.body);

  const toEmail = req.body.email;
  const toName = req.body.name;

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("the user while sending verification email: ", user);
    const verificationLink = `https://schoolfeepayments.cbe.com.et/verify?token=${verificationToken}`;
    // const verificationLink = `https://197.156.127.115/verify?token=${user.verificationToken}`;
    const transporter = nodemailer.createTransport({
      host: "smtpa.cbe.com.et",
      port: 25,
      // secure: false,
      // auth: { user: fromMail, pass: fromPassword },
    });
    const mailOptions = {
      from: "CBE SchoolPay",
      to: toEmail,
      subject: "CBE SchoolPay Email Verification",
      html: `Hello, <br/><br/><a href="${verificationLink}" target="_blank">Click👆 this link to complete verification.</a> <br/> Thank you for doing businnes with us. <br/><br/> <b>CBE School Fee Payment System.</b>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT");
    res.status(250).json("Email sent succesfully!");
  } catch (error) {
    console.log("Failed to send email", error);
    res.status(421).json("Error while sending email.");
    // console.error("Error:", error);
    // throw error; // If an error occurs, throw it so it can be caught in the registerUser function
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("I have entered register");
  const { name, email, password, roles, schoolId } = req.body;
  const eligebleEmailAdress = [
    "KalebBekele@cbe.com.et",
    "MillionTenkir@cbe.com.et",
    "kennataddese6@gmail.com",
  ];

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exists
  const Name = validator.escape(validator.trim(name));
  const Email = validator.escape(validator.trim(email));
  const userExists = await User.findOne({ name: Name });
  const emailUsed = await User.findOne({ email: Email });

  if (userExists) {
    res.status(409);
    throw new Error(`User name ${name} is already taken. Use another one.`);
  }

  if (emailUsed) {
    res.status(409);
    throw new Error(
      `Email:  ${email} is already used. Use another one. Or reset password`
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // const verificationToken = crypto.randomBytes(20).toString("hex");
  // Call the function to send the email sendEmailJobApplied();
  let user;

  if (roles === 3300) {
    user = await User.create({
      name: Name,
      email: Email,
      password: hashedPassword,
      roles: roles,
      verified: false,
      verificationToken,
      passwordUpdate: false,
    });
    // check if user created
    if (user) {
      // 201 is okay and stg was created
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        secretKey: user.hashedSecretKey,
        token: generateToken(user._id),
        verificationToken,
        passwordUpdate: user.passwordUpdate,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else if (roles === 0000) {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken,
      roles,
      passwordUpdate: false,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        ame: user.name,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id),
      });
    }
  } else if (roles === 5150) {
    if (eligebleEmailAdress.includes(email)) {
      // 201 is okay and stg was created
      // Create admin user
      user = await User.create({
        name: Name,
        email: Email,
        password: hashedPassword,
        roles: roles,
        verified: false,
        verificationToken,
        passwordUpdate: false,
      });
    } else {
      res.status(400);
      throw new Error("Incorrect Secret Key!");
    }

    if (user) {
      // 201 is okay and stg was created
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        secretKey: user.hashedSecretKey,
        token: generateToken(user._id),
        verificationToken,
        passwordUpdate: user.passwordUpdate,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

  // else create simple user
  else if (roles === 2001) {
    user = await User.create({
      name: Name,
      email: Email,
      password: hashedPassword,
      roles: roles,
      verified: false,
      verificationToken,
      passwordUpdate: false,
    });
    console.log("after a user is created the token: ", user);
    await Notification.create({
      header: "Account Created",
      content:
        "You have successfully created a CBE school payment account. Please verify you email address with in 24 hours.",
      user: user.id,
    });

    // check if user created
    if (user) {
      // // 201 is okay and stg was created
      userSession = {
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        secretKey: user.hashedSecretKey,
        token: generateToken(user._id),
        verified: user.verified,
        passwordUpdate: user.passwordUpdate,
      };

      req.session.user = userSession;
      try {
        res
          .status(200)
          .cookie(
            "mp_52e5e0805583e8a410f1ed50d8e0c049",
            JSON.stringify(userSession),
            {
              // domain: ".yourdomain.com",
              maxAge: 1800000,
              secure: true,
              // Other options here
            }
          )
          .json({ message: "User registration successful", user: userSession });
      } catch (error) {
        console.error("Failed to send verification email:", error);
        res.status(409).json({
          message: "Failed to send verification email. Please try again later.",
        });
      }
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else if (roles === 2002) {
    user = await User.create({
      name: Name,
      email: Email,
      password: hashedPassword,
      roles: roles,
      verified: false,
      verificationToken,
      schoolId: schoolId,
      passwordUpdate: false,
    });
    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id),
        schoolId: user.schoolId,
        passwordUpdate: user.passwordUpdate,
      });
    }
  }
});

const AdminloginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      token: generateToken(user._id),
      schoolId: user.schoolId,
      passwordUpdate: user.passwordUpdate 
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Email or Password");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const Email = validator.escape(validator.trim(email));
  const Password = validator.escape(validator.trim(password));
  // Check for user email
  const user = await User.findOne({ email: Email });
  if (user) {
    if (await bcrypt.compare(Password, user.password)) {
      // Successfully authenticated user
      userSession = {
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id),
        verified: user.verified,
      };
      req.session.user = userSession;
      if (userSession.roles === 5150 && !userSession.verified) {
        res.status(401);
        throw new Error("Please verify your Email first");
      } else {
        res
          .status(200)
          .cookie(
            "mp_52e5e0805583e8a410f1ed50d8e0c049",
            JSON.stringify(userSession),
            {
              // domain: ".yourdomain.com",
              maxAge: 1800000,
              secure: true,
              // Other options here
            }
          )
          .json({ message: "Login successful", user: userSession });
      }
    } else {
      res.status(401);
      throw new Error("Incorrect Password.");
    }
  } else {
    // res.status(400).json({ error: "Incorrect Email or Password" });
    res.status(401);
    throw new Error("Incorrect Email or Password");
  }
});

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Logout failed" });
    } else {
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).json({ message: "Logout successful" });
    }
  });
};

const getMe = asyncHandler(async (req, res) => {
  const userId = validator.escape(validator.trim(req.user.id));
  const { _id, name, email, roles } = User.findById(userId);
  res.status(200).json({ id: _id, name, email, roles });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// check old password
const checkOldPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const Email = validator.escape(validator.trim(email));
  const Password = validator.escape(validator.trim(password));
  // Check for user email
  const user = await User.findOne({ email: Email });
  if (user && (await bcrypt.compare(Password, user.password))) {
    res.json("Operation Successful");
  } else {
    res.status(400);
    throw new Error("Incorrect Password");
  }
});
// verify email existence
const verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const Email = validator.escape(validator.trim(email));
  // Check for user email
  const user = await User.findOne({ email: Email });
  if (user) {
    res.status(200);
    res.json(email);
    try {
      // Compose the verification link
      const otp = crypto.randomInt(100000, 1000000);
      // Compose the email
      const mailOptions = {
        from: process.env.SCHOOL_EMAIL,
        to: Email,
        subject: "Your One-Time Password",
        text: `Dear ${user.name},

        We received a request for a One-Time Password (OTP) associated with your account. Please use the following OTP to proceed:
        
        OTP: ${otp}
        
        Please enter this OTP in the appropriate field on our website or app. Note that this OTP is valid for 30 minutes only.
        
        For your security, never share this OTP with anyone, even if they claim to be from our company. We will never ask you for this information.`,
      };
      // Send the email using Nodemailer or your preferred email delivery service
      const transporter = nodemailer.createTransport({
        host: "smtpa.cbe.com.et",
        port: 25,
        secure: false,
      });
      let key = Email;
      CacheStorage.set(key, otp, 300);
      let value = CacheStorage.get(Email);
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // res.status(500).json({ error: "Failed to send verification email" });
    }
  } else {
    res.status(400);
    throw new Error("Email does not exist. Try again!");
  }
});

// verify the OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, stringOTP } = req.body;
  let value = CacheStorage.get(email);
  if (value === Number(stringOTP)) {
    res.status(200).json("The Otp is correct");
  } else {
    res.status(401).json("The OTP is inCorrect");
  }
});

// verify an API key and grant access token
const refreshToken = asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("auth header ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }
    console.log("this is the case");

    const headerRefreshToken = authHeader.split(" ")[1];
    console.log(
      "your refresh token ***************************** acctok: ",
      headerRefreshToken
    );

    // Verify the refresh token before returning a new one
    const decodedRefreshToken = jwt.verify(
      headerRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log("werwerw: ", decodedRefreshToken);
    // Secure comparison (avoid logging API key)
    if (!decodedRefreshToken) {
      console.log("nay");
      //  HANDLE ACCOUNT BLOCKING HERE!! (blacklist the requesitng service)
      res.status(401).json({ message: "Invalid access token." });
      return;
    }
    // if your refresh token is has left 90secs or 1hr, i'll send you a new refresh and access tokens
    const refreshTokenExpiryTime = decodedRefreshToken?.exp * 1000;
    console.log("refreshTokenExpiryTime", refreshTokenExpiryTime);
    const timeRemaining = refreshTokenExpiryTime - Date.now();
    console.log("timeRemaining", timeRemaining);
    let refreshToken;
    const accessToken = generateAnAccessToken();

    if (timeRemaining <= 90000) {
      console.log("also updating your refresh token ...");
      refreshToken = generateARefreshToken();
      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } else {
      res.status(200).json({
        accessToken,
      });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid Access Token." });
  }
});

const verifyApiKey = asyncHandler(async (req, res) => {
  try {
    console.log("verifying...");
    const authHeader = req.headers.authorization;
    console.log("auth header ", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid authorization header" });
    }
    const apiKey = authHeader.split(" ")[1];
    // require("dotenv").config({ path: "/.env.api_keys" });
    require("dotenv").config({
      path: path.join(__dirname, "..", ".env.api_keys"),
    });
    const apiKeys = Object.entries(process.env)
      .filter(([key]) => key.startsWith("API_KEY_"))
      .map(([key, value]) => ({
        key,
        value: value.split(";")[0], // Extract only the API key itself
      }));
    const accessToken = generateAnAccessToken();
    const refreshToken = generateARefreshToken();

    let api_key_store = [];
    apiKeys.forEach((key) => {
      api_key_store.push(key.value);
    });

    console.log("api key store ", api_key_store);

    if (api_key_store.includes(apiKey)) {
      console.log("store includes: ", api_key_store.includes(apiKey));
      res.status(200).json({
        accessToken,
        refreshToken,
      });
      console.log("api key store includes apiken");
    } else {
      res.status(401).json({ message: "Invalid API Key" });
    }
  } catch (error) {
    console.log("failed!!!!!!!");
    return res.status(500).json({ error: "Internal server error" });
  }
});

function generateAnAccessToken() {
  const token = uuid.v4();
  const generatedAccessToken = jwt.sign(
    { token },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const accessTokenExpirationTime = jwt.decode(generatedAccessToken).exp;

  // console.log("access exp time: ", accessTokenExpirationTime);
  const accessToken = {
    value: generatedAccessToken,
    expiresIn: accessTokenExpirationTime,
  };

  // console.log("the acccess token before sending: ", accessToken);
  return accessToken;
}

function generateARefreshToken() {
  // console.log("requested a refresh token ^^^^^^^^^^^^ ");
  const token = uuid.v4();
  const generatedRefreshToken = jwt.sign(
    { token },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const refreshTokenExpirationTime = jwt.decode(generatedRefreshToken).exp;
  const refreshToken = {
    value: generatedRefreshToken,
    expiresIn: refreshTokenExpirationTime,
  };
  // console.log("the refresh token before sending: ", refreshToken);
  return refreshToken;
}

// ank function
const editUsers = asyncHandler(async (req, res) => {
  const { email, password, roles } = req.body;

  if (!email || !password) {
    res.status(400);
    const emptyvaluefields = [];
    email ? null : emptyvaluefields.push("Email");
    password ? null : emptyvaluefields.push("Password");
    throw new Error(`Please fill in ${emptyvaluefields}`);
  }

  // Check if user exists
  const Email = validator.escape(validator.trim(email));
  const Password = validator.escape(validator.trim(password));
  const userExists = await User.findOne({ email: Email });
  const takenemail = await User.findOne({ email: Email });
  const sameDatas = [];

  if (userExists) {
    if (takenemail && takenemail.email !== userExists.email) {
      // check if email is not taken and its not the requesters email
      res.status(409);
      throw new Error(
        `Email ${takenemail.email} has already been taken. No updates`
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    if (userExists.email === email || userExists.roles === roles) {
      userExists.email === email ? sameDatas.push("email") : null;
    }

    const update = { password: hashedPassword, email };
    userExists.email = await update.email;
    userExists.password = await update.password;
    await userExists.save();

    res.status(200);
    res.json(
      `The User ${userExists.email} has been updated. (${sameDatas})entered is same as previous data and is not updated`
    );
  } else {
    res.status(404);
    throw new Error(`The name ${email} is not found. please try again`);
  }
});
const EmailVerification = async (req, res) => {
  // const sanitizedToken = validator.escape(validator.trim(req.body.token));
  const sanitizedToken = req.body.token;
  const unVerifiedUser = await User.findOne({
    verificationToken: sanitizedToken,
  });

  if (unVerifiedUser) {
    unVerifiedUser.verified = true;
    unVerifiedUser.verificationToken = null;
    await unVerifiedUser.save();

    userSession = {
      _id: unVerifiedUser.id,
      name: unVerifiedUser.name,
      email: unVerifiedUser.email,
      roles: unVerifiedUser.roles,
      secretKey: unVerifiedUser.hashedSecretKey,
      token: generateToken(unVerifiedUser._id),
      verified: unVerifiedUser.verified,
    };

    req.session.user = userSession;
    console.log("Here is the user section now", userSession);
    res
      .status(201)
      .cookie(
        "mp_52e5e0805583e8a410f1ed50d8e0c049",
        JSON.stringify(userSession),
        {
          // domain: ".yourdomain.com",
          maxAge: 1800000,
          secure: true,
          // Other options here
        }
      )
      .json({ message: "user successfully verified", user: userSession });

    console.log("user successfully verified.");
  } else {
    res.status(404).json(` User not found `);
  }
};

const checkSession = (req, res) => {
  if (req.session && req.session.user) {
    // If there is a user session, it's still active
    res.sendStatus(200); // Respond with a success status code (e.g., 200)
  } else {
    // If there is no user session, it has expired
    res.sendStatus(401); // Respond with an unauthorized status code (e.g., 401)
  }
};

module.exports = {
  registerUser,
  AdminloginUser,
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
  verifyApiKey,
  refreshToken,
  Mail,
  sendEmailJobApplied,
};
