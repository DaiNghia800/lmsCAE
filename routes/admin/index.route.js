const systemConfig = require("../../config/system");
const dashboardRoute = require("./dashboard.route");
const classRoute = require("./class.route");
const studentRoute = require("./student.route");
const teacherRoute = require("./teacher.route");

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
    app.use(
        `${PATH_ADMIN}/dashboard`,
        dashboardRoute
    );
    app.use(
        `${PATH_ADMIN}/class`,
        classRoute
    );
    app.use(
        `${PATH_ADMIN}/students`,
        studentRoute
    );
    app.use(
        `${PATH_ADMIN}/teachers`,
        teacherRoute
    );
};

