const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/user.model');

const User = mongoose.model('User');
passport.use(
    new localStrategy (
        {usernameField:'email'},
        (username,password,done)=>{
            User.findOne({email:username},
                (err,user)=>{
                    if(err){
                         return done(err);

                    }
                    // unknow users 
                    else if(!user)
                    {
                        return done (null ,false , {message:'Email is not registered'})

                    }
                    // wrong password 
                    else if (!user.comparePassword(password)){
                        return done (null , false , {message:'wrong password '});
                    }
                    // authentication successful 
                    else{
                        return done (null ,user);
                    }
                
                   
                });
        })

);