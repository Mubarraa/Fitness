const express = require("express")
const router = express.Router();
const Achievement = require("../models/Achievement").model;
const verify = require("./verifyToken");
const User = require("../models/User");
const functions = require('./helper');

// On achievement page
router.get("/", verify, async (req, res) => {
    // get all undeleted achievements
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        const unDeleted = functions.getDeleted(false, achievements)
        const achieved = getAchievedAchievements(unDeleted)
        res.json(achieved);
    } catch(err) {
        res.json({message: err});
    }
});

// On achievement page
router.get("/type/:achievementType", verify, async (req, res) => {
    // get all undeleted achievements of a particular type
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const allAchievements = currentUser.achievementInfo
        let achievements = getAchievementsByType(allAchievements, req.params.achievementType)
        let unDeleted = functions.getDeleted(false, achievements)
        const achieved = getAchievedAchievements(unDeleted)
        res.json(achieved);
    } catch(err) {
        res.json({message: err});
    }
});


// On deleted achievements page
router.get("/removed", verify, async (req, res) => {
    // get all deleted achievements
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        let unDeleted = functions.getDeleted(true, achievements)
        const achieved = getAchievedAchievements(unDeleted)
        res.json(achieved);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific achievement
router.get('/:achievementId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        let specificAchievement = functions.getObject(req.params.achievementId, achievements)
        res.json(specificAchievement);
    } catch (err) {
        res.json({message: err});
    }
});

// add new achievement 
router.post("/", verify, async (req, res) => {
    // create new achievement
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        const newAchievement = new Achievement({
            name: req.body.post.name,
            relationId: req.body.post.id,
            typeOfAchievement: req.body.post.typeO
        });
        // save achievement to database
        achievements.push(newAchievement)
        currentUser.save()
        res.json(newAchievement)
    } catch(err) {
        res.json({message: err});
    }
});

// delete achievement permanently
router.delete('/:achievementId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        let specificAchievement = functions.getObject(req.params.achievementId, achievements)
        achievements.pull(specificAchievement)
        currentUser.save()
        res.json(achievements);
    } catch(err) {
        res.json({message: err});
    }
})

// update achievement - delete
router.patch('/:achievementId/remove', verify, async (req, res) => {
    try{
        // delete
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        let specificAchievement = functions.getObject(req.params.achievementId, achievements)
        if (specificAchievement === null) {
            res.json("Achievement not found")
        }
        specificAchievement.deleted = req.body.patch
        currentUser.save()
        // return achievement
        res.json(specificAchievement);
    } catch(err) {
        res.json({message: err});
    }
});

// update achievement - achieve/unachieve
router.patch('/:achievementId/achieve', verify, async (req, res) => {
    try{
        // find user and their achievements
        const currentUser = await User.findOne({ _id: req.user._id });
        const achievements = currentUser.achievementInfo
        const achievement = functions.getObject(req.params.achievementId, achievements)
        if (achievement === null) {
            res.json("Achievement not found")
        }
        // get coins achieved and update
        const achieved = req.body.patch
        const coins = req.body.coins
        if (achieved){
            achievement.coinsAchieved += coins
            achievement.timesAchieved++
        } else {
            if (achievement.timesAchieved > 0) {
                achievement.coinsAchieved -= coins
                achievement.timesAchieved--
            }
        }
        // save
        currentUser.save()
        // return updated habit
        res.json(achievement);
    } catch(err) {
        res.json({message: err});
    }
});

// acheivements split into types: habits, goals, general, food etc...
function  getAchievementsByType(achievements, typeOfAchievement) {
    let res = []
    for (num in achievements) {
        if (achievements[num].typeOfAchievement === typeOfAchievement) {
            res.push(achievements[num])
        }
    }
    return res
}

// get achievements only if achieved
function  getAchievedAchievements(achievements) {
    let res = []
    for (num in achievements) {
        if (achievements[num].timesAchieved > 0) {
            res.push(achievements[num])
        }
    }
    return res
}

module.exports = router;