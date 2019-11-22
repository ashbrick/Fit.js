const express = require('express');
const router = express.Router();
const Exercises = require('../models/exercises.js');
// const Workouts = require('../models/workouts.js'); //need to access workouts in order to create relational db and push exercises into the Exercises array that's in workoutSchema

//==============
// INDEX: GET ROUTE
//==============
//show list of exercises
router.get('/', (req, res) => {
    Exercises.find({}, (err, foundExercise) => {
        res.json(foundExercise);
        console.log('finding...');//logs in terminal
    });
});
// tested successfully with curl: curl http://localhost:3000/exercises
//

//==============
// CREATE: POST ROUTE
//==============
//this should push a new exercise into the exercise array that's nested within the workouts schema (maybe using unshift() method so that it get's pushed onto beginning of list) -->>>!!!!!!!!! haven't created that functionality yet tho!!!!!!!!!
router.post('/', (req, res) => {
    console.log('creating...')//logs in terminal
    Exercises.create(req.body, (err, createdExercise) => {
        res.json(createdExercise);
    });
});
// tested successfully using: curl -X POST -H "Content-Type: application/json" -d '{"exercise": "pullups","sets":3, "reps":10,"rest":60}' http://localhost:3000/exercises
//=====> need to change "exercise" to "exerciseName"

//==============
// DESTROY: DELETE ROUTE
//==============
router.delete('/:id', (req, res) => {
    console.log('deleting...')//logs in terminal to test route
    Exercises.findByIdAndRemove(req.params.id, (error, deletedExercise) => {
        res.json(deletedExercise);
    });
});
// tested successfully using: curl -X DELETE http://localhost:3000/exercises/5dd820c8d9e3607ffbb673c4

//==============
// UPDATE: PUT ROUTE
//==============
//can edit an exercise
router.put('/:id', (req, res) => {
    Exercises.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedExercise) => {
        res.json(updatedExercise);
    });
});
// tested successfully using: curl -X PUT -H "Content-Type: application/json" -d '{"exercise": "situps","sets":3, "reps":10,"rest":600000}' http://localhost:3000/exercises/5dd822a86839f480a78a234f
//=====> need to change "exercise" to "exerciseName"


module.exports = router;
