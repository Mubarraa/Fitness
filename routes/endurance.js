const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");

const myValidSchemas = require("../validation");

router.get('/balance ', async (req,res) => {
	const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;
	try { 
		res.json({endurance:userEx.endurance});
	} catch (err) {
		res.json ({message:err});
	}
});


// add minutes to balance page
router.patch("/add", async (req, res) => {
	
	const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;

	if (req.query.enduranceMin > 0 ){
		const newEx = +req.query.enduranceMin;
		const prevtotal = userEx.endurance.minutes;
		const total = prevtotal + newEx;
		
		const updateEndurance = {};
		try {
			updateEndurance =  User.findByIdAndUpdate( req.user, 
				{ $set: {'exercsieInfo.endurance.minutes': total}},
				{ $push : {'exercsieInfo.endurance.ofDates': Date.now()} },
				function(err, doc){			
				
				console.log(doc);
				//res.json(updateEndurance);
		});
			res(updateEndurance);
		
		} catch(err){
			res.json({message: err});
		}

	}
	
});

module.exports = router;