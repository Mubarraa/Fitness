// Imports
const express = require("express");
const mongoose = require("mongoose");
// For storing passwords
const dotenv = require("dotenv/config");

// Functions
const app = express();

/* -------------------------------------------------------------------------- */
/*                                Import routes                               */
/* -------------------------------------------------------------------------- */

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const extraInfoRoute = require("./routes/extraInfo");
const waterRoute = require("./routes/water");
const habitsRoute = require("./routes/habits");
const goalsRoute = require("./routes/goals");
const exerciseRoute = require("./routes/exercise");
const foodRoute = require("./routes/food");
const strengthRoute = require("./routes/strength");
const achievementsRoute = require("./routes/achievements");
const homeRoute = require("./routes/home");
const progressRoute = require("./routes/progress");

/* -------------------------------------------------------------------------- */
/*                             Connect to database                            */
/* -------------------------------------------------------------------------- */

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) =>
    console.log(`Connected to DB helloooo,\nErrors: ${err}\n-----`)
);
mongoose.set("debug", true);

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */
/*                              Route middlewares                             */
/* -------------------------------------------------------------------------- */

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/extraInfo", extraInfoRoute);
app.use("/api/water", waterRoute);
app.use("/api/habits", habitsRoute);
app.use("/api/goals", goalsRoute);
app.use("/api/exercise", exerciseRoute);
app.use("/api/food", foodRoute);
app.use("/api/strength", strengthRoute);
app.use("/api/achievements", achievementsRoute);
app.use("/api/achievements", achievementsRoute);
app.use("/api/home", homeRoute);
//api.use('/api/progress', progressRoute);

// Listen to incoming connections
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running");
    }
});

app.post("/exercise", async (req, res) => {
    const ex = new Exercise(req.body);

    try {
        await ex.save();
        res.send(ex);
    } catch (err) {
        res.status(500).send(err);
    }
    try {
        await ex.save();
        res.send(ex);
    } catch (err) {
        res.status(500).send(err);
    }
});
