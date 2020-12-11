const mongoose = require('mongoose');

const EmotionSchema = new mongoose.Schema({
    emotion:{
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Emotion', EmotionSchema)
module.exports.actual_model = EmotionSchema;

   