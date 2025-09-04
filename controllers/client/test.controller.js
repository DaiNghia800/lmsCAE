const Test = require('../../models/Test.model');
const Class = require('../../models/Class.model');
const AssignedTestModel = require('../../models/AssignedTest.model');

module.exports.createTest = async (req, res) => {
    try {
        const { title, questions, audioUrl, imageUrl } = req.body;

        const test = await Test.create({
            createdBy: req.user._id,
            title,
            questions,
            audioUrl,
            imageUrl,
            assignedClasses: []
        });

        res.status(201).json({
            message: 'Test created and stored in teacher\'s library', test 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while creating test' });
    }
};

module.exports.assignTest = async (req, res) => {
    try {
        const { testId, classId, deadline } = req.body;

        const test = await Test.findOne({
            _id: testId,
            createdBy: req.user._id 
        });
        if(!test) {
            return res.status(404).json({
                error: 'Test not found or unauthorized'
            });
        }

        const classDoc = await Class.findOne({
            _id: classId,
            teacherId: req.user._id        
        });
        if(!classDoc) {
            return res.status(404).json({
                error: 'Class not found or unauthorized' 
            });
        }

        const alreadyAssigned = await AssignedTestModel.findOne({
            testId,
            classId
        });
        if(alreadyAssigned) {
            return res.status(400).json({
                error: 'This test has already been assigned this class'
            });
        }

        const assignment = await AssignedTestModel.create({
            testId,
            classId,
            deadline: deadline || null,
            assignedBy: req.user._id
        });

        test.assignedClasses.push(classId);
        await test.save();

        res.status(201).json({
            message: 'test successfully assigned to class',
            assignment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error while assigning test'
        });
    }
};