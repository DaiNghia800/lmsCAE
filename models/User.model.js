const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true 
    },
    status: {
        type: String
    },
    token: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    // Teacher 
    classesJoined: [
        {
            class: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Class'
            },
            status: {
                type: String,
                enum: ['pending', 'approved', 'rejected'],
                default: 'pending'
            }
        }
    ],
    // Student can save excercises submitted
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);