const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
//test component 
const jwtDecoder = require ('../config/jwtDecoder');

// routes 

router.post('/register',ctrlUser.register);
router.post('/auth',ctrlUser.authenticate);
router.get('/profile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// test routes 
router.get('/test',jwtDecoder.verfyJwtToken,ctrlUser.userProfile);

module.exports = router

