const homeRoute = require("./home.route");
const aboutRoute = require("./about.route");
const contactRoute = require("./contact.route");
const authRoute = require("./auth.route");
const classesRoute = require('./classes.route');
const testRoute = require('./test.route');
const flashMessages = require("../../middlewares/client/flashMessages");


module.exports = (app) => {
    app.use(flashMessages);
    app.use("/", homeRoute);
    app.use("/about", aboutRoute);
    app.use("/contact", contactRoute);
    app.use("/auth", authRoute);
    app.use("/class", classesRoute);
    app.use("/test", testRoute);
};