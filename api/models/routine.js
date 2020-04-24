const mongoose = require('mongoose');

const routineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rtnid: mongoose.Schema.Types.ObjectId,
    user:{
        email:{type: String},
        userid:{type: String},
        username:{type: String},
        name:{type: String}
    },
    tasks:[{
        tid: mongoose.Schema.Types.ObjectId,
        time: {type:Date, default:Date.now},
        category:{
            name:{type: String},
            color:{type: String},
            cindex:{type: Number}
        },
        title:{type: String},
        detailed:{type: String},
        days:[{type: String}],
        start:{type: Date},
        end:{type: Date},
        timePeriod:{type: String},     //calculated
        done:{type: Boolean,default:false},
        reminder:{
            rtime:{type: Date},         // calculated time at which reminder will be set
            before:{type: Number}       //time before in minutes
        },        
    }]
});

module.exports = mongoose.model('Routine',routineSchema);