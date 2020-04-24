const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    email:{
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    time: {type:Date, default:Date.now},
    username:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    member:{type: Boolean},
    bmi:{type: Number},
    obese:{type: Boolean},
    surveyDetails:{
        survey:{type: Boolean,default:false},
        agegrp:{type: Number},        // {1: "8-17",2: "18-28",3: "29-40",4: "40 above"} 
        height:{type: Number},
        weight:{type: Number},
        questions:{
            heartProblem:{type: Boolean},
            highBP:{type: Boolean},
            breathProblem:{type: Boolean},
            smoker:{type: Boolean},
            poorSleepingHabit:{type: Boolean},
            injury:{type: Boolean},
            injuryDetails:[{type: String}],
            sports:[{type: String}],
            goal:{
                name:{type: String},
                gindex:{type: Number}
            },
            extraQues:[{
                name:{type: String},
                ans:{type: String}
            }],
            // MORE CAN BE ADDED LATER SO THINK TILL THEN >_<
        }
    }
});

module.exports = mongoose.model('User',userSchema);