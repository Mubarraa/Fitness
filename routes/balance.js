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
		res.json({balance:userEx.balance});
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

	if (req.query.balanceMin > 0 ){
		const newEx = +req.query.balanceMin;
		const prevtotal = userEx.balance.minutes;
		const total = prevtotal + newEx;
		
		const updateBalance = {};
		try {
			updateBalance =  User.findByIdAndUpdate( req.user, 
				{ $set: {'exercsieInfo.balance.minutes': total}},
				{ $push : {'exercsieInfo.balance.ofDates': Date.now()} },
				function(err, doc){			
				
				console.log(doc);
				//res.json(updateBalance);
		});
			res(updateBalance);
		
		} catch(err){
			res.json({message: err});
		}

	}
	
});


module.exports = router;