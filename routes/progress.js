const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const User = require("../models/User");

// models required
const Habit = require("../models/Habit");
const Achievement = require("../models/Achievement");
const Exercise = require("../models/Exercise");
const Water = require("../models/WaterModel");
const Food = require("../models/Food");
const Emotion = require("../models/Emotion");

var MongoClient = require('mongodb').MongoClient;

// get all the data pertaining to  a certain area to create all time graph
router.get("/", verify, async (req, res) => {
    if (req.body.area === "Achievements") {
        // if user requests achievements
        try {
            // find the current user
            const achievements = await User.findOne({
                _id: req.user
            },
            {achievementInfo: true});
            // return .json file with achievements info and user id
            res.json(achievements);
        } catch(err) {
            res.json({message: err});
        }
    } else if (req.body.area == "Exercise") {
        // if user requests exercise
        try {
            // find the current user
            const exercises = await User.findOne({
                _id: req.user
            },
            {exerciseInfo: true});
            // return .json file with exercise info and user id
            res.json(exercises);
        } catch(err) {
            res.json({message: err});
        }
    } else if (req.body.area == "Water Intake") {
        // if user requests water
        try {
            // find the current user
            const water = await User.findOne({
                _id: req.user
            },
            {waterInfo: true});
            // return .json file with water info and user id
            res.json(water);
        } catch(err) {
            res.json({message: err});
        }
    } else if (req.body.area === "Food Intake") {
        // of user requests food
        try {
            // find the current user
            const food = await User.findOne({
                _id: req.user
            },
            {foodInfo: true});
            // return .json file with food info and user id
            res.json(food);
        } catch(err) {
            res.json({message: err});
        }
    } else if (req.body.area === "Emotional State") {
        // if user requests emotions
        try {
            // find the current user
            const emotions = await User.findOne({
                _id: req.user
            },
            {emotionInfo: true});
            // return .json file with emotion info and user id
            res.json(emotions);
        } catch(err) {
            res.json({message: err});
        }
    } else if (req.body.area === "Personal Habits") {
        // if user requests personal habits
        try {
            // find the current user
            const habits = await User.findOne({
                _id: req.user
            },
            {habitInfo: true});
            // return .json file with habit info and user id
            res.json(habits);
        } catch(err) {
            res.json({message: err});
        }
    }

});

module.exports = router
