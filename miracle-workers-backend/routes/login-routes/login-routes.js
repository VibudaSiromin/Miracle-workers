const express=require('express');
const router=express.Router();

const loginControllers=require("../../controllers/login-controllers/login-controllers");

// register
app.post('/register',loginControllers.register)

//login

app.post('/login-user',loginControllers.login)

//forgot password

app.post('/forgot-password',loginControllers.forgotPassword)

//reset passoword

app.get('/reset-password/:id/:token',loginControllers.getResetPassword);

app.post('/reset-password/:id/:token',loginControllers.resetPassword);
