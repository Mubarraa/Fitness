const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2,
    },

    frequency: {
        type: String,
        required: true,
        enum: ["Day", "Week", "Month", "Year"],
    },
    custom: {
        type: Number,
        default: 1,
        max: 365,
        min: 1,
    },

    deleted: {
        type: Boolean,
        default: false,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

    subGoals: {
        type: [],
        default: []
    },

    subgoal: {
        type: Boolean,
        default: false
    },

    parentGoal: {
        type: String,
        default: ""
    },

    completionRate: {
        type: Number,
        default: 0
    },
    
    datesAchieved: {
        type: [{
            dateAchieved:{type:Date}, 
            completion: {type:Number}
        }],
        default: [],
    },

    coinsPerAchievement: {
        type: Number,
        default: 50
    }
});

module.exports.model = mongoose.model("Goal", goalSchema);
module.exports.actual_model = goalSchema;
