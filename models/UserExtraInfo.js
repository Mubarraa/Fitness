const mongoose = require("mongoose");

const UserExtraInfoSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
        max: 635,
        min: 2
    },

    height: {
        type: Number,
        required: true,
        max: 261,
        min: 57
    }
});

module.exports = mongoose.model("UserExtraInfo", UserExtraInfoSchema);
module.exports.actual_model = UserExtraInfoSchema;
