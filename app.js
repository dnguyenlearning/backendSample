const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');


//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to database '+config.database);
})

mongoose.connection.on('error',(err)=>{
    console.log('error:' + err);
})



const app=express();

const users=require('./routes/users');

const port=3000;


//set static folder

app.use(express.static(path.join(__dirname,'public')));



//cors middleware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//passport middleware

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users',users);

app.get('/',(req,res)=>{
    res.send('invalid endpoint');
})

app.listen(port, (err)=>{
    if(err) throw err;
    console.log('server started on port '+port);
})