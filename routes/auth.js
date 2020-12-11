const router = require("express").Router();
const User = require("../models/User");
const myValidSchemas = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation

const Joi = require("@hapi/joi");

router.post("/register", async (req, res) => {
    // Validate data

    const { error } = myValidSchemas.RegisterationValidation.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    //if (error) return res.status(400).send(error);

    // Check if user exists in the data base

    const EmailExists = await User.findOne({ email: req.body.email });

    if (EmailExists) {
        return res.status(400).send("Email already exists");
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save to data base

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: HashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    const { error } = myValidSchemas.LogInValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Email wrong");
    }
    // Password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send("Password wrong");

    // create and assigne token

    try {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        return res.status(200).set("auth-token", token).send(token);
    } catch (error) {
        return res.status(400).send(error);
    }

    res.send("logged in");
});

module.exports = router;
