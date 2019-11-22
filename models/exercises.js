const mongoose = require('mongoose');
const Workouts = require('./workouts.js'); // requiring the Workouts collection so that Exercises can access the properties and become relational so that they interact and pull from each other

//created framework for exercise creation in database
const exerciseSchema = new mongoose.Schema({
    exerciseName: String,
    sets: Number,
    reps: Number,
    rest: Number
});

const Exercises = mongoose.model('Exercise', exerciseSchema); // 'Exercise' creates a collection in the db

module.exports = Exercises; //export it so it can be accessed as a variable and required by controllers
