const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = require('../models/user');

// change the JWT token secret string
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decoded = jwt.verify(token,'mysecretjwtstringforfitnessoverseer');
        req.UserData = decoded;

        next();
    }catch(error){
        return res.json({
            message: 'Authentication Failed'
        });
    }
}