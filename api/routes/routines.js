const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Routine = require('../models/routine');

/* 

1. Add a task to user routine
2. Update a perticular task from a user routine
3. Show a user routines
4. Show all user routines
5. Delete a whole routine of aperticular user
6. Delete a Task from a user routine
*/

// TODO : Update the task of a user .

// 1>
router.post('/add',checkAuth,(req,res,next)=>{
    
    // finding if user's tasks list does not exists.
    // making routine data for new entry.
    var routineData = new Routine({
        _id: new mongoose.Types.ObjectId(),
        rtnid: new mongoose.Types.ObjectId(),   
        user:req.UserData
    });

    // pushing task into task list array.
    // making a task details object that will be pushed. 

    var taskDetails = new Object({
        tid: new mongoose.Types.ObjectId(),
        category:req.body.category,
        title:req.body.title,
        detailed:req.body.detailed,
        days:req.body.days,
        start:req.body.start,
        end:req.body.end,
        timePeriod:req.body.timePeriod,
        reminder:req.body.reminder
    });

    Routine.find({"user.userid":req.UserData.userid})
            .exec()
            .then(result=>{
                if(result.length==0){
                    routineData.save().then(result=>{
                        Routine.findOneAndUpdate({"user.userid":req.UserData.userid},{$push:{ tasks: taskDetails }})
                            .exec()
                            .then(tasks=>{
                                res.json({
                                            message:"Task Added"
                                        })
                                })
                                .catch(err=>{
                                        res.json({
                                            message: "Task not added to the list",
                                            error:err
                                        });
                                });
                    });
                }else{
                    Routine.findOneAndUpdate({"user.userid":req.UserData.userid},{$push:{ tasks: taskDetails }})
                            .exec()
                            .then(tasks=>{
                                res.json({
                                            message:"Task Added"
                                        })
                                })
                                .catch(err=>{
                                        res.json({
                                            message: "Task not added to the list",
                                            error:err
                                        });
                                });
                }
            })
            .catch(err=>{
                res.json({
                    message: "Something went wrong",
                    error:err
                });
            });


});


// 2>
// Updating the value of tasks
router.post('/update/task/:tid',checkAuth,(req,res,next)=>{

    // updating task into task list array.
    // making a task details object that will be updated. 

    var taskDetails = new Object({
        tid:req.params.tid,
        category:req.body.category,
        title:req.body.title,
        detailed:req.body.detailed,
        days:req.body.days,
        start:req.body.start,
        end:req.body.end,
        timePeriod:req.body.timePeriod,
        done:req.body.done,
        reminder:req.body.reminder
    });    


    Routine.findOneAndUpdate({"user.userid":req.UserData.userid},
                             {$set:{$match:{"tasks":{tid:req.params.tid}},tasks:taskDetails}})
        .exec()
        .then(result=>{
            res.json({
                message: "Task Updated",
                result: result
            });
        })
        .catch(err=>{
            res.json({
                error: err
            });
        });
});

// 3>
// Fetching a task data of a perticular user.
router.get('/user/tasks',checkAuth,(req,res,next)=>{
    Routine.findOne({"user.userid":req.UserData.userid}).exec()
        .then(task=>{
            //check for task[].length >=1
        res.json({
            message:"Task Found",
            routine: task
            });
        })
        .catch(err=>{
            res.json({
                message:"Task Not Found",
                error: err
            });
        });
});


// 4>
// Fetching all routine data.
router.get('/all/tasks',(req,res,next)=>{
    Routine.find().exec()
        .then(task=>{
            //check for task[].length >=1
        res.json({
            message:"Task Found",
            routine: task
            });
        })
        .catch(err=>{
            res.json({
                message:"Task Not Found",
                error: err
            });
        });
});

// 5>
// Deleting a routine data
router.delete('/delete/:rtnid',(req,res,next)=>{
    Routine.remove({rtnid:req.params.rtnid})
        .exec()
        .then(result=>{
            res.json({
                message: "Routine Deleted"
            });
        })
        .catch(err=>{
            res.json({
                error: err
            });
        });
});


// 6>
// Deleting a routine data
router.delete('/delete/task/:tid',checkAuth,(req,res,next)=>{
    Routine.findOneAndUpdate({"user.userid":req.UserData.userid},
                             {$pull:{"tasks":{_id:req.params.tid}}})
        .exec()
        .then(result=>{
            res.json({
                message: "Task Deleted",
                result: result
            });
        })
        .catch(err=>{
            res.json({
                error: err
            });
        });
});

//7>
//Finding a task from its 'tid' 
router.get('/task/:tid',checkAuth,(req,res,next)=>{
    Routine.findOne({"user.userid":req.UserData.userid},{"tasks":{$elemMatch:{tid:req.params.tid}}})
    .exec()
    .then(result=>{
        res.json({
            message:"Task Found",
            result: result
        });
    })
    .catch(err=>{
        res.json({
            error: err
        });
    });
});

module.exports = router;