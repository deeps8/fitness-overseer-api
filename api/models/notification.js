const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{
        userid:{type: String},
        username:{type: String},
        name:{type: String}
    },
    notificationBody:{type:String},   
    rtime:{type: Date},
    time: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Notify',notifySchema);