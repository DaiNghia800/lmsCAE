const mongoose = require('mongoose');

const assignedTestResultSchema = new mongoose.Schema({
    assignedTestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssignedTest',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [Number],
    questionResults: [
        {
            questionIndex: Number,
            selectedIndex: Number,
            correctIndex: Number,
            isCorrect: Boolean
        }
    ],
    correctCount: Number,
    score: Number,
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AssignedTestResult', assignedTestResultSchema);