const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');



//User login Route
/*
body:{
    username:string,
    password:string    
}

return:{
    email:string,
    username:string,
    name:string,
    survey:true/false,
    member:true/false

}
*/
router.post('/login',(req,res,next)=>{
    User.findOne({username: req.body.username})
        .exec()
        .then(user=>{
            //console.log(user);
            if(user == null){
                return res.json({
                    message:'Authentication Failed'
                });
            }
            if(user.length<1 ){
                return res.json({
                    message:'Authentication Failed'
                });
            }

            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    return res.json({
                        message: 'Authentication Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        username: user.username,
                        name: user.name,
                        userid: user.userid
                    },
                    'mysecretjwtstringforfitnessoverseer'
                    );
                    return res.json({
                        message: 'Authentication Successful',
                        token: token,
                        logStatus: true,
                        user: {
                                username: user.username,
                                email: user.email,
                                name: user.name,
                                survey:user.surveyDetails.survey,
                                member: user.member
                        }
                    });
                }
                res.json({
                    message: 'Authentication Failed'
                    });
                });
        })
        .catch(err=>{
            //console.log(err);
            return res.json({
                error: err
            });
        });
});

//User SignUp  Route
/*
body:{
    name:string,
    email:string,
    username:string,
    password:string,
    member:true/false
}
*/ 
router.post('/signup',(req,res,next)=>{

    User.find({email: req.body.email})
        .exec()
        .then(user=>{
            //console.log(user);
            if(user.length>=1){
                return res.json({
                    message: 'Mail Exists'
                });
            }else{
                User.find({username: req.body.username}).exec().then(user=>{
                    if(req.body.username==="you"){
                        return res.json({
                            message: 'Username exists'
                        });
                    }
                    if(user.length>=1){
                        return res.json({
                            message: 'Username exists'
                        });
                    }
                    else{
                        bcrypt.hash(req.body.password,10,(err,hash)=>{
                            if(err){
                                return res.json({
                                    error: err
                                });
                            }
                            else{

                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    userid: new mongoose.Types.ObjectId(),
                                    email: req.body.email,
                                    username: req.body.username,
                                    name: req.body.name,
                                    member:req.body.member,
                                    password: hash,
                                    });
                                user.save()
                                    .then(result=>{
                                        //console.log(result);
                                        res.json({
                                            message: 'Account Created'
                                        });
                                    })
                                    .catch(err =>{
                                        res.json({
                                            error: err
                                        });
                                    });    
                            }
                        });
                    }
                });
            }
        });
    
});


//Fetching a user data 
router.get('/getauser',checkAuth,(req,res,next)=>{
    User.findOne( {userid: req.UserData.userid}).exec()
        .then(result=>{
            const user = new User({
                userid: result.userid,
                email: result.email,
                username: result.username,
                name: result.name,
                survey: result.survey,
                member: result.member
                });   
        
        res.json({
            message:"User Found",
            user: result
            });
        })
        .catch(err=>{
            res.json({
                message:"User Not Found",
                error: err
            });
        });
});


//Fetching all user data 
router.get('/getusers',(req,res,next)=>{
    User.find().exec()
        .then(result=>{
        res.json({
            message:"User Found",
            user: result
            });
        })
        .catch(err=>{
            res.json({
                message:"User Not Found",
                error: err
            });
        });
});



// Deleting a user
router.delete('/:userId',(req,res,next)=>{
    User.remove({userid:req.params.userId})
        .exec()
        .then(result=>{
            res.json({
                message: "User Deleted"
            });
        })
        .catch(err=>{
            res.json({
                error: err
            });
        });
});

module.exports = router;