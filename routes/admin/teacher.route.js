const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/teacher.controller");

route.get("/", controller.index);

module.exports = route;