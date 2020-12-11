const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Exercise = require("../models/Exercise");


router.get("/", verify, async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user });
    res.send(currentUser);
});


// router.get("/exercise", async(req,res) => {
// 	try {
// 		const  currentUser =  User.findOne({ _id: req.user });
// 		const userExercise = Exercise.findOne({userId: currentUser});
// 		res.json(userExercise);
// 	} catch(err) {
//         res.json({message: err});
//     }
// });

module.exports = router;
