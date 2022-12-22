const mongoose = require('mongoose')
const {isEmail} = require('validator');
const LinkSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true, 'Title is required'],
        lowercase:true,
    },
    link:{
        type:String,
        required:[true, 'Link is required'], 
        lowercase:true,
    },
    username:{
        type:String,
        required:true,
    }

}, {timestamps:true})

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;