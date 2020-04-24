const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//change the routes according to the routes to be created
const userRoutes = require('./api/routes/users');
const surveyRoutes = require('./api/routes/survey');
const routineRoutes = require('./api/routes/routines');

mongoose.set('useFindAndModify', false);

//connect to mongodb
mongoose.connect('mongodb+srv://deepak:'+ process.env.MONGO_ATLAS_PW +'@fitnessoverseer-ghdr4.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });



//on connection
mongoose.connection.on('connected',()=>{
    console.log('MongoDb connected at port 27017');
});

//on error
mongoose.connection.off('error',(err)=>{
    console.log('Error connecting MongoDb at port  : ' + err);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');  
    res.header('Access-Control-Allow-headers','Origin, X-Requested-Width, Content-type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, PATCH, GET, DELETE, POST');
        return res.status(200).json({});
    }
    next();
});

// initial route app.use
app.use('/user',userRoutes);
app.use('/survey',surveyRoutes);
app.use('/routine',routineRoutes);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

// app.use((req,res,next)=>{
//     return res.json({
//         message:"Not found in routes"
//     })
// });

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    });
});



module.exports = app;