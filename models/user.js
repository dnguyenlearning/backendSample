const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const config=require('../config/database');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const User=module.exports=mongoose.model('users',UserSchema);

module.exports.getUserById=(id,callback)=>{
    User.findById(id,callback);
}

module.exports.getUserByUsernameOrEmail=(user,callback)=>{
    const query={$or:[{username:user.username}, {email:user.email}]};
    User.findOne(query,callback);
}

module.exports.getUserByUsername=(username,callback)=>{
    const query={username:username};
    User.findOne(query,callback);
}


module.exports.addUser=(newUser,callback)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword=(candidatePassword ,hash, callback)=>{
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}
