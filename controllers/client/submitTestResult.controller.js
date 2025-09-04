const AssignedTestResult = require('../../models/AssignedTestResult.model');
const Class = require('../../models/Class.model');
const AssignedTest = require('../../models/AssignedTest.model');

module.exports.submitTestResult = async (req, res) => {
    try {
        const { id: assignedTestId } = req.params;
        const { answers } = req.body;
        const studentId = req.user._id;

        // Check existing assigned test
        const assignedTest = await AssignedTest.findById(assignedTestId);
        if(!assignedTest) {
            return res.status(404).json({
                error: 'Assigned test not found'
            });
        }

        // Check student in this class
        const classData = await Class.findById(assignedTest.classId);
        if(!classData || !classData.studentIds.includes(studentId)) {
            return res.status(403).json({
                error: 'Student is not in class'
            });
        }

        // Check student have sumitted this test
        const existingResult = await AssignedTestResult.findOne({
            assignedTestId,
            studentId
        });
        if(existingResult) {
            return res.status(400).json({
                error: 'Student have submitted this test'
            });
        }

        // Check test is exist
        const test = await Test.findById(assignedTest.testId);
        if(!test) {
            return res.status(404).json({
                error: 'Test not found'
            });
        }

        let correctCount = 0;
        const questionResults = [];

        test.questions.forEach((q, i) => {
            const selected = answers[i];
            const correct = q.correctAnswerIndex;
            const isCorrect = selected === correct;

            if(isCorrect) {
                correctCount++;
            }

            questionResults.push({
                questionIndex: i,
                selectedIndex: selected,
                correctIndex: correct,
                isCorrect
            });
        });

        const score = ((correctCount / test.questions.length) * 100).toFixed(2);
        const result = await AssignedTestResult.create({
            assignedTestId,
            studentId,
            answers,
            questionResults,
            correctCount,
            score: Number(score)
        });

        res.status(201).json({
            message: "Submitted Successfully",
            correctCount,
            totalQuestions: test.questions.length,
            score: Number(score),
            questionResults
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error while submitting test'
        });
    }
};