const express = require("express");
const router = express.Router();

const loginControllers = require("../../controllers/login-controllers/login-controllers");

// register
router.post("/register", loginControllers.register);

//login

router.post("/login-user", loginControllers.login);

//forgot password

router.post("/forgot-password", loginControllers.forgotPassword);

//reset passoword
router.post("/reset-code", loginControllers.resetCode);
router.post("/reset-password", loginControllers.changePassword);

router.get("/reset-password/:id/:token", loginControllers.getResetPassword);

router.post("/reset-password/:id/:token", loginControllers.resetPassword);

module.exports = router;
