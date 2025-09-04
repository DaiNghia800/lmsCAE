const mongoose = require('mongoose');

const AssignedTestSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true 
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true  
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    deadline: {
        type: Date,
        require: false
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AssignedTest', AssignedTestSchema);