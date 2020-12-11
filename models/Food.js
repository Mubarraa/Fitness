const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    Breakfest: {
        name: { type: String, required: true, max: 255, min: 2 },
        healthy: { type: Number, required: true, max: 5, min: 1 },
        delicious: { type: Number, required: true, max: 5, min: 1 },
    },

    Lunch: {
        name: { type: String, required: true, max: 255, min: 2 },
        healthy: { type: Number, required: true, max: 5, min: 1 },
        delicious: { type: Number, required: true, max: 5, min: 1 },
    },
    Dinner: {
        name: { type: String, required: true, max: 255, min: 2 },
        healthy: { type: Number, required: true, max: 5, min: 1 },
        delicious: { type: Number, required: true, max: 5, min: 1 },
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("FoodSchema", FoodSchema);
module.exports.actual_model = FoodSchema;
