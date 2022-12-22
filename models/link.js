const mongoose = require('mongoose')
const {isEmail} = require('validator');
const LinkSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
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
    }

}, {timestamps:true})

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;