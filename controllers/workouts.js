const express = require('express');
const router = express.Router();
const Workouts = require('../models/workouts.js');

//==============
// INDEX: GET ROUTE
//==============
router.get('/', (req, res) => {
    Workouts.find({}, (err, foundWorkout) =>{
        res.json(foundWorkout); //tells client that data is coming back as JSON and not HTML
    });
});
// test successful using: curl http://localhost:3000/workouts
// shows all of the objects


//==============
// CREATE: POST ROUTE
//==============
router.post('/', (req, res) => {
    //passing req.body into the Todos collection
    //req.body is the same as data in $http() for app.js
    Workouts.create(req.body, (err, createdWorkout) => {
        res.json(createdWorkout);
         //.json() will send proper headers in response so client knows it's json coming back
    });
});
// test successful using: curl -X POST -H "Content-Type: application/json" -d '{"type": "cardio","duration":"15 min", "sets":"0", "reps":"0","rest":"0"}' http://localhost:3000/workouts
// shows new object in terminal


// DELETE
router.delete('/:id', (req, res) => {
    Workouts.findByIdAndRemove(req.params.id, (error, deletedWorkout) => {
        res.json(deletedWorkout);
    });
});
//haven't tested yet

// UPDATE
router.put('/:id', (req, res) => {
    Workouts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedWorkout) => {
        res.json(updatedWorkout);
    });
});
//haven't tested yet






module.exports = router;
