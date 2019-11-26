
const jwt = require('jsonwebtoken');

module.exports.verfyJwtToken = (req,res,next)=>{
    if(req.headers.authorization){
   var token = req.headers.authorization.split(' ')[1];
   if(!token){
       res.send({message:'No token'});
   } else{
       jwt.verify(token,process.env.JWT_SECRET, (err,decode)=>{
           if(err){
               throw err;
           } else{
               req._id = decode._id;
               next();
           }

       });
   }

   
    }}