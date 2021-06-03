const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "provide username"],
  },
  role: {
    type: String,
    required: [true, "Provide a role for user"],
    default: "patient",
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "provide email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "provide passowrd"],
    minlength: 6,
    select: false,
  },
  qualifications: {
    type: String,
  },
  mobileno: {
    type: String,
  },
  expertise: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  callid: {
    type: "string",
  },
  resetPasswordToken: String,
  resetPaswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isPasswordsMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
