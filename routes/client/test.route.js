const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/test.controller');
const requireTeacher = require('../../middlewares/client/requireTeacher.middleware');
const AssignedTestResult = require('../../controllers/client/submitTestResult.controller');

route.post('/create', 
    requireTeacher,
    controller.createTest
);

route.post('/assign', 
    requireTeacher,
    controller.assignTest
);

route.post('/assigned/:id/submit', 
    AssignedTestResult.submitTestResult
);

module.exports = route;