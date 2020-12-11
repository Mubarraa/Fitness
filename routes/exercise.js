const express = require("express");
const verify = require("./verifyToken");
const router = express.Router();
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const myValidSchemas = require("../validation");

// get current users exercise
router.get("/",  async (req, res) => {
	
	const currentUser = await User.findOne({ _id: req.user });
    res.send(currentUser.exerciseInfo);
    // try {
    //     const AllEx = await Exercise.find({});
    //     res.send(AllEx);
    // } catch(err) {
    //     res.json({message: err});
    // }
});

router.patch("/addStrength", verify, async (req, res) => {
    const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const min = +req.query.strengthMin;
    const data = {
        totalMin: req.body.totalMin,
    };

    console.log(data);

    User.findOneAndUpdate(
        { _id: req.user },
        { $push: { exerciseInfo: data } },
        { upsert: true },
        (err, foundObj) => {
            if (err) {
                console.log("Error:======", err);
            }
            if (foundObj) {
                console.log("foundObj:======", foundObj);
            }
        }
    );

    res.send("Success");
});

router.post("/find", verify, async (req, res) => {
    // const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // 1.Find the document
    // // 2.Return waterinfo

    // try {
    //     const user = await User.findOne({
    //         _id: req.user,
    //         exerciseInfo: {
    //             $elemMatch: {
    //                 date: {
    //                     $gte: new Date(new Date().setHours(00, 00, 00)),
    //                     $lt: new Date(new Date().setHours(23, 59, 59)),
    //                 },
    //             },
    //         },
    //     });
    //     res.send(user);
    //     console.log("User", user);
    // } catch (error) {
    //     res.send("Failed");
    // }
    try {
        const user = await User.findOne({
            _id: req.user,
        });

        const array = user.exerciseInfo;
        const latest = array[array.length - 1].totalMin;

        res.send({ totalMin: latest });
    } catch (error) {
        res.send("Failed");
    }

});

router.post("/strength",  verify, async(req,res) =>{
    const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    //const min = req.query.strengthMin;


    const DoesExist = await User.findOne({
        _id: req.user,
        exerciseInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
        
    });


    if (DoesExist != null) {
        // 1.Find the document
        // 2.Return exercise
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.user,
                    exerciseInfo: {
                        $elemMatch: {
                            date: {
                                $gte: new Date(new Date().setHours(00, 00, 00)),
                                $lt: new Date(new Date().setHours(23, 59, 59)),
                            },
                        },
                    },
                },
                {
                    $inc: { "exerciseInfo.$.strength": req.body.totalMin , "exerciseInfo.$.totalMin": req.body.totalMin}, 
                },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("New Error:======", err);
                    }
                    if (foundObj) {
                        console.log("EXercise  foundObj:======", foundObj);
                    }
                }                
            );
            res.send("updating exercise");
        } catch (error){
            res.send("Failed");
        }
        
    } else {
        const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const data = {
                totalMin: req.body.totalMin,
                strength: req.body.totalMin,
            };

            console.log(data);

            User.findOneAndUpdate(
                { _id: req.user },
                { $push: { exerciseInfo: data } },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("OLD Error:======", err);
                    }
                    if (foundObj) {
                        console.log("New foundObj:======", foundObj);
                    }
                }
            );
            res.send("New day");
        } catch (error){
            res.send("Failed");
        }
    }
});

router.post("/balance",  verify, async(req,res) =>{
    const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const min = req.query.balanceMin;
    
    const DoesExist = await User.findOne({
        _id: req.user,
        exerciseInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
        
    });


    if (DoesExist != null) {
        // 1.Find the document
        // 2.Return waterinfo
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.user,
                    exerciseInfo: {
                        $elemMatch: {
                            date: {
                                $gte: new Date(new Date().setHours(00, 00, 00)),
                                $lt: new Date(new Date().setHours(23, 59, 59)),
                            },
                        },
                    },
                },
                {
                    $inc: { "exerciseInfo.$.balance": req.body.totalMin , "exerciseInfo.$.totalMin": req.body.totalMin}, 
                    //$inc: { "exerciseInfo.$.totalMin": min },
                },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("New Error:======", err);
                    }
                    if (foundObj) {
                        console.log("EXercise  foundObj:======", foundObj);
                    }
                }                
            );
        } catch (error){
            res.send("Failed");
        }
        
    } else {
        const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const data = {
                totalMin: req.body.totalMin,
                balance: req.body.totalMin,
            };

            console.log(data);

            User.findOneAndUpdate(
                { _id: req.user },
                { $push: { exerciseInfo: data } },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("OLD Error:======", err);
                    }
                    if (foundObj) {
                        console.log("New foundObj:======", foundObj);
                    }
                }
            );
            res.send("New day");
        } catch (error){
            res.send("Failed");
        }
    }
});


router.post("/endurance",  verify, async(req,res) =>{
    const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const min = req.query.enduranceMin;
    
    const DoesExist = await User.findOne({
        _id: req.user,
        exerciseInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
        
    });


    if (DoesExist != null) {
        // 1.Find the document
        // 2.Return waterinfo
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.user,
                    exerciseInfo: {
                        $elemMatch: {
                            date: {
                                $gte: new Date(new Date().setHours(00, 00, 00)),
                                $lt: new Date(new Date().setHours(23, 59, 59)),
                            },
                        },
                    },
                },
                {
                    $inc: { "exerciseInfo.$.endurance": req.body.totalMin , "exerciseInfo.$.totalMin": req.body.totalMin}, 
                    //$inc: { "exerciseInfo.$.totalMin": min },
                },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("New Error:======", err);
                    }
                    if (foundObj) {
                        console.log("EXercise  foundObj:======", foundObj);
                    }
                }                
            );
        } catch (error){
            res.send("Failed");
        }
        
    } else {
        const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const data = {
                totalMin: req.body.totalMin,
                endurance: req.body.totalMin,
            };

            console.log(data);

            User.findOneAndUpdate(
                { _id: req.user },
                { $push: { exerciseInfo: data } },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("OLD Error:======", err);
                    }
                    if (foundObj) {
                        console.log("New foundObj:======", foundObj);
                    }
                }
            );
            res.send("New day");
        } catch (error){
            res.send("Failed");
        }
    }
});

router.post("/flexibility",  verify, async(req,res) =>{
    const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const min = req.query.flexMin;
    
    const DoesExist = await User.findOne({
        _id: req.user,
        exerciseInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
        
    });


    if (DoesExist != null) {
        // 1.Find the document
        // 2.Return waterinfo
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.user,
                    exerciseInfo: {
                        $elemMatch: {
                            date: {
                                $gte: new Date(new Date().setHours(00, 00, 00)),
                                $lt: new Date(new Date().setHours(23, 59, 59)),
                            },
                        },
                    },
                },
                {
                    $inc: { "exerciseInfo.$.flexibility": req.body.totalMin , "exerciseInfo.$.totalMin": req.body.totalMin}, 
                    //$inc: { "exerciseInfo.$.totalMin": min },
                },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("New Error:======", err);
                    }
                    if (foundObj) {
                        console.log("EXercise  foundObj:======", foundObj);
                    }
                }                
            );
        } catch (error){
            res.send("Failed");
        }
        
    } else {
        const { error } = myValidSchemas.ExerciseValidation.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        try {
            const data = {
                totalMin: req.body.totalMin,
                flexibility: req.body.totalMin,
            };

            console.log(data);

            User.findOneAndUpdate(
                { _id: req.user },
                { $push: { exerciseInfo: data } },
                { upsert: true },
                (err, foundObj) => {
                    if (err) {
                        console.log("OLD Error:======", err);
                    }
                    if (foundObj) {
                        console.log("New foundObj:======", foundObj);
                    }
                }
            );
            res.send("New day");
        } catch (error){
            res.send("Failed");
        }
    }
});


module.exports = router;