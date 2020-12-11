const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Food = require("../models/Food");
const myValidSchemas = require("../validation");

/* -------------------------------------------------------------------------- */
/*               Set data for breakfest and repeat for the rest               */
/* -------------------------------------------------------------------------- */

router.post("/", verify, async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user });

    res.send(currentUser);
    //res.send("Working");
});

// 1. check for a today field
// 2. Exists? Set breackfest . . .
// 3. Doesn't? create

router.post("/breakfest", verify, async (req, res) => {
    const { error } = myValidSchemas.FoodValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const queryA = await User.findOne({ _id: req.user });
    const foodList = queryA.foodInfo;

    foodList.push({
        Breakfest: {
            name: `${req.body.name}`,
            type: `${req.body.type}`,
            healthy: `${req.body.healthy}`,
            delicious: `${req.body.delicious}`,
        },
    });
    const updated1 = await queryA.save();

    foodList.Breakfest.push({
        name: req.body.name,
        healthy: req.body.healthy,
        delicious: req.body.delicious,
    });
    const updated = await queryA.save();
    console.log(updated);
    res.send(Done);

    res.send("done");
});

/* -------------------------------------------------------------------------- */
/*                                  Breakfest                                 */
/* -------------------------------------------------------------------------- */

router.post("/breakfest/modified", verify, async (req, res) => {
    const { error } = myValidSchemas.FoodValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const queryA = await User.findOne({
        _id: req.user,
        foodInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
    });

    if (queryA == null) {
        const data = {
            // Breakfest: {
            //     name: `${req.body.name}`,
            //     healthy: `${req.body.healthy}`,
            //     delicious: `${req.body.delicious}`,
            // },
        };

        console.log(data);

        User.findOneAndUpdate(
            { _id: req.user },
            { $push: { foodInfo: data } },
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
    }
    const data = {
        Breakfest: {
            name: `${req.body.name}`,
            healthy: `${req.body.healthy}`,
            delicious: `${req.body.delicious}`,
        },
    };
    const user = await User.findOneAndUpdate(
        {
            _id: req.user,
            foodInfo: {
                $elemMatch: {
                    date: {
                        $gte: new Date(new Date().setHours(00, 00, 00)),
                        $lt: new Date(new Date().setHours(23, 59, 59)),
                    },
                },
            },
        },
        {
            $set: { "foodInfo.$": data },
        },
        { upsert: true }
    );
    return res.send("Update");

    res.send("done");
});

/* -------------------------------------------------------------------------- */
/*                                    Lunch                                   */
/* -------------------------------------------------------------------------- */

router.post("/lunch/modified", verify, async (req, res) => {
    const { error } = myValidSchemas.FoodValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const queryA = await User.findOne({
        _id: req.user,
        foodInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
    });

    if (queryA == null) {
        const data = {
            // Breakfest: {
            //     name: `${req.body.name}`,
            //     healthy: `${req.body.healthy}`,
            //     delicious: `${req.body.delicious}`,
            // },
        };

        console.log(data);

        User.findOneAndUpdate(
            { _id: req.user },
            { $push: { foodInfo: data } },
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
        res.send("New day");
        res.send("Create");
    } else {
        const data = {
            name: `${req.body.name}`,
            healthy: `${req.body.healthy}`,
            delicious: `${req.body.delicious}`,
        };

        const user = await User.findOneAndUpdate(
            {
                _id: req.user,
                foodInfo: {
                    $elemMatch: {
                        date: {
                            $gte: new Date(new Date().setHours(00, 00, 00)),
                            $lt: new Date(new Date().setHours(23, 59, 59)),
                        },
                    },
                },
            },
            {
                $set: { "foodInfo.$.Lunch": data },
            },
            { upsert: true }
        );

        return res.send("Update");
    }

    res.send("done");
});

/* -------------------------------------------------------------------------- */
/*                                   Dinner                                   */
/* -------------------------------------------------------------------------- */
router.post("/dinner/modified", verify, async (req, res) => {
    const { error } = myValidSchemas.FoodValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const queryA = await User.findOne({
        _id: req.user,
        foodInfo: {
            $elemMatch: {
                date: {
                    $gte: new Date(new Date().setHours(00, 00, 00)),
                    $lt: new Date(new Date().setHours(23, 59, 59)),
                },
            },
        },
    });

    if (queryA == null) {
        const data = {
            // Breakfest: {
            //     name: `${req.body.name}`,
            //     healthy: `${req.body.healthy}`,
            //     delicious: `${req.body.delicious}`,
            // },
        };

        console.log(data);

        User.findOneAndUpdate(
            { _id: req.user },
            { $push: { foodInfo: data } },
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
        res.send("New day");
        res.send("Create");
    } else {
        const data = {
            name: `${req.body.name}`,
            healthy: `${req.body.healthy}`,
            delicious: `${req.body.delicious}`,
        };

        const user = await User.findOneAndUpdate(
            {
                _id: req.user,
                foodInfo: {
                    $elemMatch: {
                        date: {
                            $gte: new Date(new Date().setHours(00, 00, 00)),
                            $lt: new Date(new Date().setHours(23, 59, 59)),
                        },
                    },
                },
            },
            {
                $set: { "foodInfo.$.Dinner": data },
            },
            { upsert: true }
        );

        return res.send("Update");
    }

    res.send("done");
});

/* -------------------------------------------------------------------------- */
/*                           Create a new day Schema                          */
/* -------------------------------------------------------------------------- */

module.exports = router;

// name: { type: String, required: true, max: 255, min: 2 },
// healthy: { type: Number, required: true, max: 5, min: 1 },
// delicious: { type: Number, required: true, max: 5, min: 1 },
