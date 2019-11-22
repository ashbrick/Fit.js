const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: String,
    duration: String,
    date: String
    //commenting these out because I created another schema for exercises in order to relate the two dbs (exercises and workouts)
    // sets: Number,
    // reps: Number,
    // rest: Number
});

const Workouts = mongoose.model('Workout', workoutSchema);

module.exports = Workouts;
