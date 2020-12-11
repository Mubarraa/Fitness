const express = require("express")
const router = express.Router();
const verify = require("./verifyToken");
const Goal = require("../models/Goal").model;
const Achievement = require("../models/Achievement").model;
const User = require("../models/User");
const functions = require('./helper');

// On goal page
router.get("/",  verify, async (req, res) => {
    // get all undeleted goals
    console.log("getting goals")
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        let unDeleted = functions.getDeleted(false, goals)
        res.json(unDeleted);
    } catch(err) {
        res.json({message: err});
    }
});

// On top level goals page
router.get("/topLevel",  verify, async (req, res) => {
    // get all top level (not a subgoal) undeleted goals
    console.log("getting top level goals")
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        let arr = []
        for (num in goals) {
            if (goals[num].subgoal === false) {
                arr.push(goals[num])
            }
        }
        let unDeleted = functions.getDeleted(false, arr)
        res.json(unDeleted);
    } catch(err) {
        res.json({message: err});
    }
});

// On completed goals
router.get("/completed",  verify, async (req, res) => {
    // get all top level (not a subgoal) undeleted goals
    console.log("getting top level goals")
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        let arr = []
        for (num in goals) {
            if (goals[num].subgoal === false) {
                arr.push(goals[num])
            }
        }
        let unDeleted = functions.getDeleted(false, arr)
        res.json(unDeleted);
    } catch(err) {
        res.json({message: err});
    }
});


// On removed goals page
router.get("/removed", verify, async (req, res) => {
    // get all deleted goals
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        let deleted = functions.getDeleted(true, goals)
        res.json(deleted);
    } catch(err) {
        res.json({message: err});
    }
});

// looking at a specific goal
router.get('/:goalId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        res.json(specificGoal);
    } catch (err) {
        res.json({message: err});
    }
});

// add a subgoal to an existing goal
router.post('/:goalId', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        // create new goal
        const newGoal = new Goal({
            name: req.body.post.name,
            frequency: req.body.post.frequency,
            // assuming custom = 1 if not defined...
            custom: req.body.post.custom,
            subgoal: true,
            parentGoal: specificGoal._id
        });
        // create new achivement
        const newAchievement = new Achievement({
            name: newGoal.name,
            relationId: newGoal._id,
            typeOfAchievement: 'Goal'
        })
        // save goal to database
        specificGoal.subGoals.push(newGoal._id)
        currentUser.achievementInfo.push(newAchievement)
        goals.push(newGoal)
        currentUser.save()
        res.json(newGoal);
    } catch (err) {
        res.json({message: err});
    }
});

// get a list of all subgoals
router.get('/:goalId/subgoals', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        const subgoals = specificGoal.subGoals
        // get subgoals given list of subgoal ids
        let arr = []
        for (num in subgoals) {
            const id = subgoals[num]
            const subgoal = functions.getObject(id, goals)
            if (subgoal !== null) {
                arr.push(subgoal)
            }
        }  
        res.json(arr);
    } catch (err) {
        res.json({message: err});
    }
});

// add new goal
router.post("/", verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        // create new goal
        const newGoal = new Goal({
            name: req.body.post.name,
            frequency: req.body.post.frequency,
            // assuming custom = 1 if not defined...
            custom: req.body.post.custom,
        });
        // create new achievement
        const newAchievement = new Achievement({
            name: newGoal.name,
            relationId: newGoal._id,
            typeOfAchievement: 'Goal'
        })
        // save goal and achievement to database
        currentUser.goalInfo.push(newGoal)
        currentUser.achievementInfo.push(newAchievement)
        currentUser.save()
        res.json(newGoal);
    } catch(err) {
        res.json({message: err});
    }
});

// delete goal
router.delete('/:goalId', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        goals.pull(specificGoal)
        // save updated array of goals
        currentUser.save()
        res.json(goals);
    } catch(err) {
        res.json({message: err});
    }
})

// update goal - remove from 'ongoing' list of goals
router.patch('/:goalId/remove', verify, async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        if (specificGoal === null) {
            res.json("Goal not found")
        }
        // set flag as deleted and save
        specificGoal.deleted = req.body.patch
        currentUser.save()
        // return goal
        res.json(specificGoal);
    } catch(err) {
        res.json({message: err});
    }
});

// update goal - achieve/unachieve
router.patch('/:goalId/achieve', verify, async (req, res) => {
    try{
        console.log("patching goal")
        const currentUser = await User.findOne({ _id: req.user._id });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        if (specificGoal === null) {
            res.json("Goal not found")
        }
        // update completion rate
        const completionRate = req.body.completion/100
        specificGoal.completionRate = completionRate
        // update new coins and achievement
        const newCoin = Math.round(specificGoal.coinsPerAchievement*completionRate)
        const achievement = functions.getAchievement(specificGoal._id, currentUser.achievementInfo)
        achievement.coinsAchieved = newCoin
        specificGoal.completionRate = completionRate
        updateCompletion(specificGoal, goals)
        currentUser.save()
        // return updated goal
        res.json(specificGoal);
    } catch(err) {
        res.json({message: err});
    }
});

// get latest goal completion
router.get('/:goalId/lastAchievement', verify, async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user });
        const goals = currentUser.goalInfo
        const specificGoal = functions.getObject(req.params.goalId, goals)
        updateCompletion(specificGoal, goals)
        currentUser.save()
        res.json(specificGoal.completionRate)
    } catch(err) {
        res.json({message: err});
    }
})

// update completion rate of parent goals given completion rate
// of subgoals
function updateCompletion(goal, goals) {
    const subgoals = goal.subGoals
    let completion = 0
    let totalSubgoals = subgoals.length
    console.log(subgoals)
    // average completion rate og subgoals to get completion rate
    // of parent goal
    for (num in subgoals) {
        const subgoalId = subgoals[num]
        const subgoal = functions.getObject(subgoalId, goals)
        completion += subgoal.completionRate/totalSubgoals
    }
    if (subgoals.length != 0) {
        goal.completionRate = completion
    }
}

module.exports = router;
