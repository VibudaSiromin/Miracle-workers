const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const User =require("../../models/user-models/user");

const register=async(req,res,next)=>{
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
}


const login=async(req,res,next)=>{
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
}


const forgotPassword=async(req,res,next)=>{
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "miracleworkers44@gmail.com",
          pass: "MiracleWorkers#50",
        },
      });
      var mailOptions = {
        from: "miracleworkers44@gmail.com",
        to: email,
        subject: "Password Reset",
        text: link,
      };
      console.log("HALOOOOO")

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          console.log("HALOOOOO ppppo")

        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
    } catch (error) { 

    }
}

const getResetPassword=async(req,res,next)=>{
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
}

const resetPassword=async(req,res,next)=>{
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
}

exports.register=register;
exports.login=login;
exports.forgotPassword=forgotPassword;
exports.getResetPassword=getResetPassword;
exports.resetPassword=resetPassword;