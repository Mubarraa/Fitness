// exercise schema
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
        
    totalMin: {type: Number, default: 0},
    strength: {type: Number, default: 0},
    endurance: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    flexibility: {type: Number, default: 0},   
    date: {type: Number, default: Date.now},
});

module.exports.model = mongoose.model("exercise", exerciseSchema);
module.exports.actual_model = exerciseSchema;
