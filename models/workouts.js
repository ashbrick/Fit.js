const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: String,
    duration: String,
    sets: Number,
    reps: Number,
    rest: Number
});

const Workouts = mongoose.model('Workout', workoutSchema);

module.exports = Workouts;
