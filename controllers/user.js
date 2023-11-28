const User = require('../models/user');
const Link = require('../models/link')
const errorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const getUserDetails = async (req,res)=>{
    const username = req.params.slug;
    try{
        const user = await User.findOne({username});
        if(user){
            let {password, _id,updatedAt, __v, ...others} = user._doc;
            const links = await Link.find({userId:_id});
            others['links'] = links;
            res.status(200).json(others)
        }else{
            res.status(404).json({error:'Invalid details'})
        }
    }catch(err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }
}

const getLoggedInUserDetails = async (req,res)=>{
    const token =  req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async (err, decodedToken)=>{  
            if(err){
                res.status(400).json({error:"Invalid token, Please log in again"})
            }else{
                try{
                    const user = await User.findById(decodedToken.id)
                  
                    if(user){
                        let {password,_id, updatedAt, __v, ...others} = user._doc;
                        const links = await Link.find({userId:_id});
                        
                        others['links'] = links;
                        res.status(200).json(others)
                    }else{
                        res.status(404).json({error:'Invalid detail'})
                    }
                }catch(err){
                    const {status, ...others} = errorHandler(err);
                    res.status(status).json(others);
                }
            }
        })
    }else{
        res.status(400).json({error:"Please log in"})
    }
}

const updateUser = async (req,res)=>{
    const token = req.headers.authorization;
    const body = req.body
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async(error, decodedToken)=>{
            if(error){
                res.status(400).json({error:"Invalid token, Please log in again"})
            }else{
                try{
                    const user = await User.findByIdAndUpdate(decodedToken.id, body, {new:true})
                    if(user){
                        let {password,_id, updatedAt, __v, ...others} = user._doc;
                        res.status(200).json({user:others, message:'User updated successfully', success:true})
                    }else{
                        res.status(404).json({error:'Invalid detail'})
                    }
                }catch(err){
                    const {status, ...others} = errorHandler(err);
                    res.status(status).json(others);
                }
            }
        })

       
    }else{
        res.status(400).json({error:"Please log in"})
    }
}

const updatePassword = async (req,res)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async(err, decodedToken)=>{
            if(err){
                res.status(400).json({error:"Invalid token, Please log in"})
            }else{
                try{
                    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    const user = await User.findByIdAndUpdate(decodedToken.id, {password:hashedPassword}, {new:true});
                    res.status(200).json({message:'Password updated successfully', success:true})
                }catch(err){
                    const {status, ...others} = errorHandler(err);
                    res.status(status || 400).json(others);
                }
               
            }
        })
    }else{
        res.status(400).json({error:"Please log in"})
    }

}

const updateProfilePicture = (req,res)=>{
    const token = req.headers.authorization;
    const body = req.body
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async (err, decodedToken)=>{
            if(err){
                res.status(400).json({error:"Invalid token, Please log in"})
            }else{
                try{
                    const user = await User.findByIdAndUpdate(decodedToken.id, body, {new:true});
                    const {profilePic, ...others} = user._doc;
                    res.status(200).json({message:"Profile Picture Updated successfully", success:true, profilePic});
                }catch(err){
                    const {status, ...others} = errorHandler(err);
                    res.status(status || 400).json(others);
                }
            }
        })
       
    }else{
        res.status(400).json({error:"Please log in"})
    }
   
}

module.exports = {getUserDetails,getLoggedInUserDetails, updateUser, updatePassword, updateProfilePicture};