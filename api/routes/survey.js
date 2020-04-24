const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');


// Submit the survey detials
/* 
Authorization{
    jwt token
}
body{
    agegrp:number[1/2/3/4]
    height:number
    weight:number
    heartProblem:
    highBP:
    breathProblem:
    smoker:
    poorSleepingHabbit:
    injury:
    injuryDetails:[injury1,injury2]
    sports:
    goal:{
        name:
        gindex:
    }   
}
*/

router.post('/submit',checkAuth,(req,res,next)=>{
    
    var surveyData = new Object({
        survey:true,
        agegrp:req.body.agegrp,
        height:req.body.height,
        weight:req.body.weight,
        questions:req.body.questions
    }); 

    User.findOneAndUpdate( { userid: req.UserData.userid },{ $set:{surveyDetails: surveyData} } ).exec()
        .then( result =>{
            res.json({
                message: "Survey Completed",
                user: result.surveyDetails
            });
        })
        .catch(err=>{
            res.json({
                message: "Something went wrong",
                error:err
            });
        });
});




module.exports = router;