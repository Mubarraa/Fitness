
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },

    deleted: {
        type: Boolean,
        default: false
    },

    relationId: {
        type: String,
        required: true
    },

    typeOfAchievement: {
        type: String,
        required: true,
        enum: ['Habit', 'Goal', 'Exercise', 'Food', 'Water', 'General']
    },

    coinsAchieved: {
        type: Number,
        default: 0
    }, 

    dateCreated: {
        type: Date,
        default: Date.now
    },

    timesAchieved: {
        type: Number,
        default: 0
    },

});

module.exports.model = mongoose.model("Achievement", achievementSchema);
module.exports.actual_model = achievementSchema;
