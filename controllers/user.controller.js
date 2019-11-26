const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const _ = require('lodash');
require('../models/user.model');
//import user schems
const User = mongoose.model('User');


// register user 
module.exports.register = (req,res)=>{
    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password,10)
    newUser.save((err,user)=>{
        if(err){
            throw err;
        } else{
            user.password = undefined;
            res.send(user);
        }
    })
}

// authenticate

module.exports.authenticate = (req,res,next)=>{

// call passport auth
passport.authenticate('local',(err,user,info)=>{

    // error  from passport  middleware 
    if(err){
        return res.status(400).json(err);

    }
    //registered user 
    else if(user){
        return res.status(200).json({token:user.generateJwt()});
    }
    // unknown  user and wrong password
    else{
        return res.status(400).json(info);

    }


})(req,res);


}

// user profile 

module.exports.userProfile = (req,res,next)=>{
    User.findOne({_id:req._id},(err,user)=>{
        if(!user){
            return res.status(404).json({status:false,message:'user record dose not exits '});
        }
        else{
            return res.status(201).json({status:true , user:_.pick(user,['fullName','email'])});
        }
    });

}

// test component 
module.exports.userData = (req,res,next)=>{
    User.findOne({_id:req._id},(err,user)=>{
        if(!user){
            return res.status(404).json({status:false , message:' user recode not found'});

        } else{
            return res.status(200).json({status:true , user:_.pick(user,['fullName','email'])});

        }

    });
}

