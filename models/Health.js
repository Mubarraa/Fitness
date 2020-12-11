const mongoose = require('mongoose');

const HealthSchema = new mongoose.Schema({
    health: {
        type: Number,
        required: true,
        max: 100,
        min: 0,
        default: 50
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Health', HealthSchema)
module.exports.actual_model = HealthSchema;
