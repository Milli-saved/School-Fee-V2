const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    secretKey: {
      type: String,
      default: "sDoVwRLhojZxeyQICmqhjPulH4tTNviziSu",
    },
    roles: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: [true, "Please add a verification status"],
    },
    schoolId: {
      type: String,
    },
    passwordUpdate: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
