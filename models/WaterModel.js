const mongoose = require("mongoose");

const WaterSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        max: 100000,
        min: 0,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("WaterSchema", WaterSchema);
module.exports.actual_model = WaterSchema;
