var mongoose = require("mongoose");
const savedLocation = require("./savedLocation");

module.exports = mongoose.model("User",{
    userName:{type:String,required:true},
    email:{type:String,required: true,unique: true},
    password:{type:String, required:false},
    fromGoogle:{type:Boolean,required:true},
    profileImage:{type:String,required:false},
    savedLocation: [savedLocation]
});