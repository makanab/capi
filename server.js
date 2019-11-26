require('./config/config');
require('./models/db');
require('./config/passportconfig');


const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

var app = express();
const rtsIndex = require('./routes/index.router')


//middleware 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);


// error handling
app.use((err,req,res,next)=>{
if(err.name === 'validationError'){
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors); 
    
}
});

// start server 

app.listen(process.env.PORT,(err)=>{
if(!err){
    console.log('server started at port:' + process.env.PORT);
}
});

