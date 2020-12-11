const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Water = require("../models/WaterModel");
const myValidSchemas = require("../validation");

/* -------------------------------------------------------------------------- */
/*                                  Add Water                                 */
/* -------------------------------------------------------------------------- */

router.post("/add", verify, async (req, res) => {
    const { error } = myValidSchemas.WaterValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const data = {
        quantity: req.body.quantity,
    };

    console.log(data);

    User.findOneAndUpdate(
        { _id: req.user },
        { $push: { waterInfo: data } },
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

/* -------------------------------------------------------------------------- */
/*                          Match by day month year                           */
/* -------------------------------------------------------------------------- */

router.post("/find", verify, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user,
        });

        const array = user.waterInfo;
        const latest = array[array.length - 1].quantity;

        res.send({ quantity: latest });
    } catch (error) {
        res.send("Failed");
    }
});

router.post("/findAdd", verify, async (req, res) => {
    const { error } = myValidSchemas.WaterValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const DoesExist = await User.findOne({
        _id: req.user,
        waterInfo: {
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
        const user = await User.findOneAndUpdate(
            {
                _id: req.user,
                waterInfo: {
                    $elemMatch: {
                        date: {
                            $gte: new Date(new Date().setHours(00, 00, 00)),
                            $lt: new Date(new Date().setHours(23, 59, 59)),
                        },
                    },
                },
            },
            {
                $inc: { "waterInfo.$.quantity": req.body.quantity },
            },
            { upsert: true }
        );
        return res.send("Drank more water");
        //console.log(user);
    } else {
        const { error } = myValidSchemas.WaterValidation.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const data = {
            quantity: req.body.quantity,
        };

        console.log(data);

        User.findOneAndUpdate(
            { _id: req.user },
            { $push: { waterInfo: data } },
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
    }
});

module.exports = router;
