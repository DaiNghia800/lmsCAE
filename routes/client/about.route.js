const express = require('express');
const route = express.Router();
const controllers = require('../../controllers/client/about.controller');

route.get("/" , controllers.index);

module.exports = route;