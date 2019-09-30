const express = require('express')
const server = express();
const mongoose = require('mongoose')


//Import Routes 

const authRoute = require('./services/auth');


//Mongoose Connect


mongoose.connect('mongodb://localhost:27017/loginDB',{useNewUrlParser:true, useUnifiedTopology: true},()=>
console.log('connected to DB')
);

// Middlewares
server.use(express.json());

// Route Middlewares
server.use('/api/user', authRoute);

server.listen(3450, ()=> console.log('Server Is RUNNING'))


