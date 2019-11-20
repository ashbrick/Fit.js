const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection
require('dotenv').config()
console.log(process.env);
//____________
//PORT
//____________
const PORT = process.env.PORT

console.log(PORT);

app.get('/', (req, res)=>{
    res.send("hello world");
})


// --------
//DATABASE
//---------
const PROJECT3_DB = process.env.PROJECT3_DB
console.log(PROJECT3_DB);

mongoose.connect(PROJECT3_DB, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', PROJECT3_DB));
db.on('disconnected', () => console.log('mongo disconnected'));


// --------
//MIDDLEWARE
//---------
//use public folder for static assets like CSS JS
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));





//
// app.listen(3000, ()=>{
//     console.log('listening...');
// });
