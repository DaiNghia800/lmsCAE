const express = require('express');
const route = express.Router();
const controllers = require('../../controllers/client/home.controller');

route.get("/" , controllers.index);

module.exports = route;