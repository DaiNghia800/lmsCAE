const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: String,
    questions: [{
        questionText: String,
        options: [String],
        correctAnswerIndex: Number,
        image: String,
        audio: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    assignedClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Test', testSchema);