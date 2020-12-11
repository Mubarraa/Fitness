const express = require("express")
const router = express.Router();
const verify = require("./verifyToken");
const Habit = require("../models/Habit").model;
const Achievement = require("../models/Achievement").model;
const User = require("../models/User");
const functions = require('./helper');


// On habit page
router.get("/",  verify, async (req, res) => {
    console.log("getting habits...")
    // get all undeleted habits
    try {
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        let unDeleted = functions.getDeleted(false, habits)
        console.log(".undeleted habits:::", unDeleted)
        res.json(unDeleted);
    } catch(err) {
        res.json({message: err});
    }
});

// On removed habits page
router.get("/removed", verify, async (req, res) => {
    // get all removed habits
    try {
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        let deleted = functions.getDeleted(true, habits)
        res.json(deleted);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific habit
router.get('/:habitId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const specificHabit = functions.getObject(req.params.habitId, habits)
        res.json(specificHabit);
    } catch (err) {
        res.json({message: err});
    }
});

// add new habit
router.post("/", verify, async (req, res) => {
    // create new habit
    try {
        const currentUser = await User.findOne({ _id: req.user });
        let custom = req.body.post.custom
        if (req.body.post.custom === null) {
            custom = 1
        }
        const newHabit = new Habit({
            name: req.body.post.name,
            frequency: req.body.post.frequency,
            // assuming custom = 1 if not defined...
            custom: custom,
            // assuming good habit if not defined
            good: req.body.post.good,
        });
        // create new achievement
        const newAchievement = new Achievement({
            name: newHabit.name,
            relationId: newHabit._id,
            typeOfAchievement: 'Habit'
        })
        // save to database
        currentUser.habitInfo.push(newHabit)
        currentUser.achievementInfo.push(newAchievement)
        currentUser.save()
        res.json(newHabit);
    } catch(err) {
        res.json({message: err});
    }

});

// delete habit permanently
router.delete('/:habitId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const specificHabit = functions.getObject(req.params.habitId, habits)
        habits.pull(specificHabit)
        // save updated habit list
        currentUser.save()
        res.json(habits);
    } catch(err) {
        res.json({message: err});
    }
})

// update habit - remove from 'ongoing'
router.patch('/:habitId/remove', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const habit = functions.getObject(req.params.habitId, habits)
        if (habit === null) {
            res.json("Habit not found")
        }
        // set deleted flag and save from ongoing lsit
        habit.deleted = req.body.patch
        currentUser.save()
        // return habit
        res.json(habit);
    } catch(err) {
        res.json({message: err});
    }
});

// update habit - achieve/unachieve - assume done at most once a day
router.patch('/:habitId/achieve', verify, async (req, res) => {
    try {
        // find habits
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const habit = functions.getObject(req.params.habitId, habits)
        if (habit === null) {
            res.json("Habit not found")
        }
        // set achievement date and completion rate
        const achieved = req.body.patch
        const completionRate = req.body.completion/100
        const timesAchieved = habit.datesAchieved.length
        const achievement = functions.getAchievement(habit._id, currentUser.achievementInfo)
        const completion = {
            'dateAchieved': Date.now(),
            'completion': completionRate
        }
        if (timesAchieved > 0) {
            const lastAchieved = habit.datesAchieved.pop()
            const coinsReceived = Math.round(lastAchieved.completion*habit.coinsPerAchievement)
            const today = new Date(Date.now())
            const sameDay = functions.sameDay(lastAchieved.dateAchieved, today)
            // only put back in if unrealted (completed on different day)
            if (!sameDay) {
                habit.datesAchieved.push(lastAchieved)
            } else {
                achievement.coinsAchieved -= coinsReceived
                achievement.timesAchieved--
            }
            // if same day, replace + readjust number of coins
            if (achieved) {
                habit.datesAchieved.push(completion)
                let newCoin = Math.round(habit.coinsPerAchievement*completionRate)
                if (!habit.good) {
                    newCoin = -newCoin
                }
                achievement.coinsAchieved += newCoin
                achievement.timesAchieved++
            } 
        } else {
            // not achieved before
            // just add coins and completion
            if (achieved) {
                habit.datesAchieved.push(completion)
                let newCoin = Math.round(habit.coinsPerAchievement*completionRate)
                // minus coins for completing bad habits
                if (!habit.good) {
                    newCoin = -newCoin
                }
                achievement.coinsAchieved += newCoin
                achievement.timesAchieved++
            }
        }
        // save updated achievements
        currentUser.save()
        // return updated habit
        res.json(habit);
    } catch(err) {
        console.log(err)
        res.json({message: err});
    }
});

// get habit achievements
router.get('/:habitId/achievements', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const specificHabit = functions.getObject(req.params.habitId, habits)
        const achievements = specificHabit.datesAchieved
        res.json(achievements);
    } catch(err) {
        res.json({message: err});
    }
})

// get latest habit achievements
router.get('/:habitId/lastAchievement', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user });
        const habits = currentUser.habitInfo
        const specificHabit = functions.getObject(req.params.habitId, habits)
        const achievements = specificHabit.datesAchieved
        // if achieved, return last achievement
        if (achievements.length > 0) {
            const lastAchievement = achievements[achievements.length-1]
            res.json(lastAchievement);
        } else {
            // if not achieved, return nothing
            res.json({})
        }
    } catch(err) {
        res.json({message: err});
    }
})

module.exports = router;
