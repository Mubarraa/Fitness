const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const myValidSchemas = require("../validation");


router.get('/strength', async (req,res) => {
	const { error } = myValidSchemas.ExercsieValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;
	try { 
		res.json({strength:userEx.strength});
	} catch (err) {
		res.json ({message:err});
	}
});


// add minutes to strength page
router.patch("/add", async (req, res) => {

	//console.log("on strength page")
	const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const currentUser = await User.findOne({ _id: req.user });
	const userEx = currentUser.exerciseInfo;

	if (req.query.strengthMin > 0 ){
		const newEx = +req.query.strengthMin;
		const prevtotal = userEx.strength.minutes;
		const total = prevtotal + newEx;
		
		const updateStrength = {};
		try {
			updateStrength =  User.findByIdAndUpdate( req.user, 
				{ $set: {'exerciseInfo.strength.minutes': total}},
				{ $push : {'exerciseInfo.strength.ofDates': Date.now()} },
				function(err, doc){			
				
				console.log(doc);
				//res.json(updateStrength);
		});
			res(updateStrength);
			//set(updateStrength,'oneEx.strength.minutes', 'total');
		} catch(err){
			res.json({message: err});
		}

	}
	
});

module.exports = router;