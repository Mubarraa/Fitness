const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const ExtraUserInfo = require("../models/UserExtraInfo");
const myValidSchemas = require("../validation");

router.post("/", verify, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user },
            { $set: { name: req.body.name } },
            { new: true },
            (err, data) => {
                if (err) {
                    return res.send(err);
                }
            }
        );

        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// Can be used to update aswell
router.post("/extra", verify, async (req, res) => {
    const { error } = myValidSchemas.ExtraInfoValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ _id: req.user });
    user.extraUserInfo = {
        height: req.body.height,
        weight: req.body.weight,
    };

    const newUser = await user.save();

    res.send(newUser);
});

module.exports = router;
