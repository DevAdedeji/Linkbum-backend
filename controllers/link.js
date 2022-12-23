const User = require('../models/user')
const Link = require('../models/link');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const addLink = async (req,res) =>{
    const token = req.headers.authorization;
    const title = req.body.title
    const link = req.body.link

    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async(err, decodedToken)=>{
            if(err){
                res.status(400).json({error:"Invalid token, Please log in"})
            }else{
                const user = await User.findById(decodedToken.id);
                const {username, _id} = user._doc;
                const newLink = await Link.create({username, userId:_id, title, link})
                res.status(200).json({sucess:true, message:"Link added, successfully", newLink})
            }
        })
    }else{
        res.status(400).json({error:"Please log in"})
    }

}

const updateLink = (req,res) =>{
    
}

const deleteLink = (req,res) =>{
    
}

module.exports = {addLink, updateLink, deleteLink}