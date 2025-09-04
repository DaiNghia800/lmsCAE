const User = require('../../models/User.model');
const ForgotPassword = require("../../models/Forgot-password.model");
const bcrypt = require('bcryptjs');
const { generateRandomString } = require('../../helpers/generateString.helper');
const generateNumber = require("../../helpers/generateNumber.helper");
const sendMailHelper = require("../../helpers/sendMail.helper");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(!email && !password && !role) {
            req.flash('error', 'You must fill in this form!');
            return res.redirect("/auth/register");
        }

        // Check if the email is in a valid format and ends with @gmail.com
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            req.flash('error', 'Invalid email! Must be a Gmail address.');
            return res.redirect("/auth/register");
        }

        // Check if the password meets the length and complexity requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            req.flash('error', 'Password must be at least 8 characters, include uppercase, lowercase, and a number.');
            return res.redirect("/auth/register");
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ 
            email,
            deleted: false
        });
        if (existingUser) {
            req.flash('error', 'Email already exists!');
            return res.redirect("/auth/register");
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        await User.create({
            fullName: email,
            email,
            password: hashedPassword,
            token: generateRandomString(30),
            role,
            status: "active"
        });

        req.flash('success', 'Register success!');
        res.redirect("/auth/login");
    } catch (error) {
        console.error(error);
        req.flash('error', 'Register failed!');
        res.redirect("/auth/register");
    }
};

module.exports.registerPage = (req, res) => {
    res.render('client/pages/auth/register', {
        pageTitle: 'Register',
        csrfToken: req.csrfToken(),
    });
};

module.exports.loginPage = (req, res) => {
    res.render('client/pages/auth/login', {
        pageTitle: 'Login',
        csrfToken: req.csrfToken(),
    });
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        if(!email && !password) {
            req.flash("error", "You must fill this form!");
            return res.redirect(req.originalUrl);
        }

        if(!email) {
            req.flash("error", "You must fill email input!");
            return res.redirect(req.originalUrl);
        }
        
        if(!password) {
            req.flash("error", "You must fill password input!");
            return res.redirect(req.originalUrl);
        }
        
        const user = await User.findOne({ 
            email,
            deleted: false,
            status: "active"
        });
        if(!user) {
            req.flash("error", "Email is not exist!");
            return res.redirect(req.originalUrl);
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            req.flash("error", "Invalid email or password!");
            return res.redirect(req.originalUrl);
        } 

        if (rememberMe) {
            res.cookie("token", user.token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        } else {
            res.cookie("token", user.token);
        }

        req.flash("success", "Login successful!");
        res.redirect("/");
    } catch (error) {
        req.flash("error", "Login failed!");
        return res.redirect(req.originalUrl);
    }
};

module.exports.forgotUserPage = (req, res) => {
    res.render("client/pages/auth/forgot-password", {
        pageTitle: "Forgot Password"
    });
};

module.exports.forgotUser = async (req, res) => {
    const email = req.body.email;

    const existEmail = await User.findOne({
        email,
        status: "active",
        deleted: false
    });

    if(!existEmail) {
        req.flash("error", "Email is not exist!");
        return res.redirect("back");
    }

    //First: Save email and otp in model Forgot-password
    const existEmailInForgotPassword = await ForgotPassword.findOne({
        email
    });

    if(!existEmailInForgotPassword) {
        const otp = generateNumber.generateRandomNumber(6);

        const data = {
            email,
            otp,
            expireAt: Date.now() + 5*60*1000
        }

        const record = new ForgotPassword(data);
        await record.save();
        //Second: Send otp to mail user
        const subject = "Xác thực mã OTP";
        const text = `Mã xác thực của bạn là <b>${otp}</b>. Mã OTP có hiệu lực trong vòng 5 phút, vui lòng không cung cấp mã OTP cho bất kỳ ai.`;

        sendMailHelper.sendMail(email, subject, text);
        res.redirect(`/auth/password/otp?email=${email}`);
    }
};

module.exports.otpPage = (req, res) => {
    const email = req.query.email;
    res.render("client/pages/auth/otp-password", {
        pageTitle: "OTP",
        email: email
    });
};

module.exports.otpPost = async (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;

    const existRecord = await ForgotPassword.findOne({
        email,
        otp
    });

    if(!existRecord) {
        req.flash("error", "OTP invalid!");
    }

    const user = await User.findOne({
        email
    });

    res.cookie("tokenUser", user.token);
    res.redirect("/auth/password/reset");
};

module.exports.resetPasswordPage = (req, res) => {
    res.render("client/pages/auth/reset-password", {
        pageTitle: "Reset Password"
    });
};

module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    const newPassword = await bcrypt.hash(password, 10);

    await User.updateOne({
        token: tokenUser,
        status: "active",
        deleted: false
    }, {
        password: newPassword
    });
    req.flash("success", "Changed password success!");
    res.redirect("/");
};





