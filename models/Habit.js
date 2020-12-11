const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 2,
    },

    frequency: {
        type: String,
        required: true,
        enum: ['Hour', 'Day', 'Week', 'Month',]
    },

    custom: {
        type: Number,
        default: 1,
        max: 365,
        min: 1,
    },

    datesAchieved: {
        type: [{
            dateAchieved:{type:Date}, 
            completion: {type:Number}
        }],
        default: [],
    },

    good: {
        type: Boolean,
        default: true,
    },

    deleted: {
        type: Boolean,
        default: false,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

    coinsPerAchievement: {
        type: Number,
        default: 40
    }
});

module.exports.model = mongoose.model("Habit", habitSchema);
module.exports.actual_model = habitSchema;
