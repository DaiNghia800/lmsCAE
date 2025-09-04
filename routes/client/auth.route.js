const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/auth.controller');
const csrfProtection = require('../../middlewares/client/csrf');

route.post('/register', csrfProtection, controller.registerUser);

route.get('/register', csrfProtection, controller.registerPage);

route.post('/login', csrfProtection, controller.loginUser);

route.get('/login', csrfProtection, controller.loginPage);

route.get('/forgot-password', controller.forgotUserPage);

route.post('/forgot-password', controller.forgotUser);

route.get('/password/otp', controller.otpPage);

route.post('/password/otp', controller.otpPost);

route.get('/password/reset', controller.resetPasswordPage);

route.post('/password/reset', controller.resetPasswordPost);



module.exports = route;