const mongoose = require("mongoose");
const ExtraUserInfoChild = require("./UserExtraInfo").actual_model;
const WaterChild = require("./WaterModel").actual_model;
const HabitChild = require("./Habit").actual_model;
const GoalChild = require("./Goal").actual_model;
const ExerciseChild = require("./Exercise").actual_model;
const FoodChild = require("./Food").actual_model;
const AchievementChild = require("./Achievement").actual_model;
const HealthChild = require("./Health").actual_model;
const EmotionChild = require("./Emotion").actual_model;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    extraUserInfo: ExtraUserInfoChild,

    waterInfo: [WaterChild],

    habitInfo: [HabitChild],

    goalInfo: [GoalChild],

    exerciseInfo: [ExerciseChild],
    
    foodInfo: [FoodChild],

    achievementInfo: [AchievementChild],

    //For home page
    emotionInfo: [EmotionChild],
    
    healthInfo: [HealthChild],

});

module.exports = mongoose.model("User", userSchema);
