const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exercise: String,
    sets: Number,
    reps: Number,
    rest: Number
});

const Exercises = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercises;
