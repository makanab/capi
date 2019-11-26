const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../config/config')

// create schema 
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullName:{
        type:String,
        required: ' Full Name can\'t be empty',
        unique:true
    },
    email:{
        type:String,
        required:'email can\'t be empty',
        unique:true
        
    },
hash_password:{
        type:String,
        required: [4,'password can\t be empty ']
    },saltSecret:String

});



// email regex
userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    return emailRegex.test(val);
},'invalid E-mail');


// pre event 


/*
userSchema.pre('save', (next)=>{
bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(this.password,salt ,(err,hash)=>{
        this.password = hash;
        this.saltSecret = salt;
        next();


    });
});
});
*/


// validate password 

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.hash_password)
}

// generate jwt for authentication

userSchema.methods.generateJwt = function(){
    return jwt.sign({
        _id:this._id,

    },process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXP
    });

}




mongoose.model('User',userSchema);

