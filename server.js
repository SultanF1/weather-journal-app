// Setup empty JS object to act as endpoint for all routes
projectData = {temp:'1'};


// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,function(){
    console.log('running')
})



// GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', callBack);

function callBack(req,res){
    res.send(req.body)
  projectData = req.body;
};

// POST an animal
const data = [];

app.post('/animal', addAnimal);

function addAnimal (req,res){
    data.push(req.body);
};


