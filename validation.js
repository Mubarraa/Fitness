const Joi = require("@hapi/joi");

/* -------------------------------------------------------------------------- */
/*                              Validation Forms                              */
/* -------------------------------------------------------------------------- */

const RegisterationValidation = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const LogInValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

const ExtraInfoValidation = Joi.object({
    weight: Joi.number().min(2).required().max(635),
    height: Joi.number().min(57).required().max(261),
});

const WaterValidation = Joi.object({
    quantity: Joi.number().min(100).required().max(5000),
});

const FoodValidation = Joi.object({
    name: Joi.string().min(2).required().max(255),
    healthy: Joi.number().min(1).required().max(5),
    delicious: Joi.number().min(1).required().max(5),
});

// name: { type: String, required: true, max: 255, min: 2 },
// healthy: { type: Number, required: true, max: 5, min: 1 },
// delicious: { type: Number, required: true, max: 5, min: 1 },
const ExerciseValidation = Joi.object( {
    totalMin: Joi.number(),
    // strength: Joi.number().min(100).required().max(5000),
    // endurance: Joi.number().min(100).required().max(5000),
    // balance: Joi.number().min(100).required().max(5000),
    // flexibility: Joi.number().min(100).required().max(5000),
});  

module.exports.RegisterationValidation = RegisterationValidation;
module.exports.LogInValidation = LogInValidation;
module.exports.ExtraInfoValidation = ExtraInfoValidation;
module.exports.WaterValidation = WaterValidation;

module.exports.FoodValidation = FoodValidation;
module.exports.ExerciseValidation = ExerciseValidation;
