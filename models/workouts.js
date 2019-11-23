const mongoose = require('mongoose');
const Exercises = require('./exercises.js'); // requireing Exercises so that we can pull the data from it into our workouts schema

//created framework for each workout that will get created in the database based on these properties
const workoutSchema = new mongoose.Schema({
    workoutName: String,
    duration: String,
    date: String,
    exercises: String,
    sets: Number,
    reps: Number,
    rest: Number
});

//this will create an empty array in mongo called Workouts based on the blueprint of properties (above) that each workout will have
const Workouts = mongoose.model('Workout', workoutSchema); // 'Workout creates a collection in the db'

module.exports = Workouts;




///////////// CODE GRAVEYARD /////////////

//commenting these out because I created another schema for exercises in order to relate the two dbs (exercises and workouts)
// sets: Number,
// reps: Number,
// rest: Number

//================================
//====>     for relational database
//================================
//need to be able to embed the exercise schema in an array within the workout object
// exercise: [{
//     exerciseName: String,
//     sets: Number,
//     reps: Number,
//     rest: Number
// }] //this works! no errors
    // previous tries that didn't work
        // 2. Exercises -- also giving me an error, saying 'Model' is not a valid type at path 'exercise'
        // 1. [Exercises]  -- i think this was giving me an error
// created a key for exercise in order to pull in exercises based on the array of exercise objects that getWorkouts() is creating in app.js
