const mongoose = require("mongoose");
//user schema
const userSchema = new mongoose.Schema({
    firstName :{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImage:{type:String},
})
//user model
const User = new mongoose.model("User",userSchema);

module.exports = User;
