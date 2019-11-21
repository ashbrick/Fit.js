const express = require('express');
const router = express.Router();
const Workouts = require('../models/workouts.js');

// INDEX
router.get('/', (req, res) => {
    Workouts.find({}, (err, foundWorkout) =>{
        res.json(foundWorkout); //tells client that data is coming back as JSON and not HTML
    });
});
// tested using: curl http://localhost:3000/workouts
// this works but only sends ids

// // CREATE
// router.post('/', (req, res) => {
//     //passing req.body into the Todos collection
//     //req.body is the same as data in $http() for app.js
//     Workouts.create(req.body, (err, createdWorkout) => {
//         res.json(createdWorkout);
//          //.json() will send proper headers in response so client knows it's json coming back
//     });
// });
// // tested using: curl -X POST -H "Content-Type: application/json" -d '{"type": "strength","duration":"10 min", "sets":"4", "reps":"8","rest":"2 min"}' http://localhost:3000/workouts
// // only returns the id

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

// CREATE
router.post('/', (req, res) => {
    //passing req.body into the Todos collection
    //req.body is the same as data in $http() for app.js
    Workouts.create(req.body, (err, createdWorkout) => {
        res.json(createdWorkout);
         //.json() will send proper headers in response so client knows it's json coming back
    });
});
// tested using: curl -X POST -H "Content-Type: application/json" -d '{"type": "strength","duration":"10 min", "sets":"4", "reps":"8","rest":"2 min"}' http://localhost:3000/workouts
// only returns the id




module.exports = router;
