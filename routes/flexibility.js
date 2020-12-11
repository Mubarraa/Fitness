const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const myValidSchemas = require("../validation");

router.get('/flexibility ', async (req,res) => {
	const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;
	try { 
		res.json({flexibility:userEx.flexibility});
	} catch (err) {
		res.json ({message:err});
	}
});


// add minutes to flexbility page
router.patch("/add", async (req, res) => {
	
	const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;

	if (req.query.flexibilityMin > 0 ){
		const newEx = +req.query.flexibilityMin;
		const prevtotal = userEx.flexibility.minutes;
		const total = prevtotal + newEx;
		
		const updateFlexibility = {};
		try {
			updateFlexibility =  User.findByIdAndUpdate( req.user, 
				{ $set: {'exercsieInfo.flexibility.minutes': total}},
				{ $push : {'exercsieInfo.flexibility.ofDates': Date.now()} },
				function(err, doc){			
				
				console.log(doc);
				//res.json(updateFlexibility);
		});
			res(updateFlexibility);
		
		} catch(err){
			res.json({message: err});
		}

	}
	
});

module.exports = router;