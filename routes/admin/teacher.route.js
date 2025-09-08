const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/teacher.controller");

route.get("/", controller.index);

route.get("/detail", controller.detailTeacher);

route.get("/requests", controller.requestTeacher);

module.exports = route;