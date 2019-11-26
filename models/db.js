const mongoose = require('mongoose');

// optional settings 
const  options = {
    poolSize:10,
    reconnectTries:Number.MAX_VALUE,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}

// connect to database 

mongoose.connect(process.env.MONGODB_URI , options ,(err)=>{
    if(!err){
        console.log('mongodb connected successfuly');
    } else {
        console.log('an error occured:'+ JSON.stringify(err,undefined,2));
    }

});

//import database schema 
require('./user.model');
