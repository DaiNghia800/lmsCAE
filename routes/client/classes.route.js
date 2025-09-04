const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/classes.controller');
const requireTeacher = require('../../middlewares/client/requireTeacher.middleware');
const authUser = require('../../middlewares/client/auth.middleware');

route.get('/',
    controller.index
 );

route.post('/create', 
    requireTeacher,
    controller.createClass
);

module.exports = route;