const mongoose = require('mongoose')
const {isEmail} = require('validator');
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username is required'],
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'Please enter a valid email'],
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[6, 'Minimum password length is 6 characters']
    },
    profilePic:{
        type:String,
        default:""
    }
}, {timestamps:true})

const User = mongoose.model("User", UserSchema);

module.exports = User;