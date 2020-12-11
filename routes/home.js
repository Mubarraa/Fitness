const express = require ('express');
const User = require("../models/User");
const Emotion = require("../models/Emotion");
const Health = require("../models/Health");
const verify = require("./verifyToken");
const functions = require('./helper');

const home = express.Router();

// ALL EMOTION RELATED POST/GET's 


home.post("/", verify, async (req, res) => {
    const currentUser = await User.findOne({ _id: req.user });
    res.send(currentUser);
    //res.send("Working");
});

//Get list of emotions
home.get('/emotion',verify, async (req, res) =>{
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const emotion = currentUser.emotionInfo
        let emotions = functions.getAll(emotion)
        res.json(emotions);
    }catch(err){
        res.json({message:err});
    }
}); 

//Get most recent emotion
home.get('/emotionNow',verify, async (req, res) =>{
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const emotion = currentUser.emotionInfo
        let now = functions.getFirst(emotion)
        res.json(now);
    }catch(err){
        res.json({message:err});
    }
}); 


//Post emotion
home.post('/emotion',verify, async (req, res) =>{
    
    try{
        
        const currentUser = await User.findOne({ _id: req.user._id });
        
        const newEmotion = new Emotion ({
            emotion: req.body.emotion
        });
        console.log("fui")
        console.log(newEmotion)
        // save emotion to database
        currentUser.emotionInfo.push(newEmotion)
        currentUser.save()
        res.json(newEmotion);
    }catch(err){
        res.json({message:err});
    }
});




// ALL HEALTH RELATED POST/GET's 


//Get list of health
home.get('/health',verify, async (req, res) =>{
    try{
        const currentUser = await User.findOne({ _id: req.user._id });
        const Health = currentUser.healthInfo
        const health = functions.getFirst(Health);
        res.json(health);
    }catch(err){
        res.json({message:err});
    }
}); 



//Post Health
home.post('/health',verify, async (req, res) =>{
    
    try{
        
        const currentUser = await User.findOne({ _id: req.user._id });
        
        const newHealth = new Health ({
            health: req.body.health
        });
        console.log("fui")
        currentUser.healthInfo.push(newHealth)
        currentUser.save()
        res.json(newHealth);
    }catch(err){
        res.json({message:err});
    }
});


module.exports = home
