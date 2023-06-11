const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const TwoFa = require("../../models/two-fa-code-models/two-fa");
require("dotenv").config();

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const User = require("../../models/user-models/user");
const { encrypt, decrypt } = require("../../utils/encode-decode");
const { generateResetCode } = require("../../utils/generate-reset-code");

const register = async (req, res, next) => {
  const { username, email, password, userType } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      username,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exists!!" });
    }
    const code = generateResetCode();
    await TwoFa.create({ email, code, status: 0 });
    sendForgetEmail(code, email);
    const emailHash = encrypt(email);
    return res.status(200).json({ message: emailHash });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const changeTwoFAStatusInFiveMinutes = async (req, res, next) => {
  try {
    await TwoFa.updateMany({ $set: { status: 1 } });
  } catch (error) {
    console.log(error);
  }
};

const sendForgetEmail = (code, email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 2525,
    auth: {
      user: process.env.MAIL_USER_NAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.FROM,
    to: email,
    subject: "Password Reset",
    text: code.toString(),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

const getResetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User does not exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
};

const resetCode = async (req, res, next) => {
  try {
    const { value, email } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Email does not exists" });
    }
    const emailAddress = decrypt(email);
    const twoFARecord = await TwoFa.findOne({ email: emailAddress, status: 0 });

    if (!twoFARecord) {
      return res.status(404).json({ message: "Email does not exists" });
    }
    if (!twoFARecord) {
      return res.status(404).json({ message: "Code expired or already used" });
    }

    if (twoFARecord.code !== value) {
      return res
        .status(404)
        .json({ message: "Invalid Code.Please try again!" });
    }
    await twoFARecord.updateOne(
      { _id: twoFARecord._id, status: 1 },
      { new: true }
    );
    const emailHash = encrypt(twoFARecord.email);
    return res.status(200).json({ message: emailHash });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Email does not exists" });
    }
    const emailAddress = decrypt(email);
    const user = await User.findOne({ email: emailAddress });
    if (!user) {
      return res.status(404).json({ message: "user does not exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: user._id },
      { password: encryptedPassword },
      { new: true }
    );
    return res.status(201).json({ message: "password updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.register = register;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.getResetPassword = getResetPassword;
exports.resetPassword = resetPassword;
exports.resetCode = resetCode;
exports.changePassword = changePassword;
exports.changeTwoFAStatusInFiveMinutes = changeTwoFAStatusInFiveMinutes;
