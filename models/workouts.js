const mongoose = require('mongoose');
const Exercises = require('./exercises.js'); // requireing Exercises so that we can pull the data from it into our workouts schema

//created framework for each workout that will get created in the database based on these properties
const workoutSchema = new mongoose.Schema({
    type: String,
    duration: String,
    date: String,
    exercise: [Exercises] // created a key for exercise in order to pull in exercises based on the array of exercise objects that getWorkouts() is creating in app.js
});

//this will create an empty array in mongo called Workouts based on the blueprint of properties (above) that each workout will have
const Workouts = mongoose.model('Workout', workoutSchema); // 'Workout creates a collection in the db'

module.exports = Workouts;




///////////// CODE GRAVEYARD /////////////

//commenting these out because I created another schema for exercises in order to relate the two dbs (exercises and workouts)
// sets: Number,
// reps: Number,
// rest: Number
