const User = require('../models/user');
const Link = require('../models/link')
const errorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const getUserDetails = async (req,res)=>{
    const username = req.params.slug;

    try{
        const user = await User.findOne({username});
        if(user){
            let {password, updatedAt, __v, ...others} = user._doc;
        const links = await Link.find({username});
        others['links'] = links;
        res.status(200).json(others)
        }else{
            res.status(404).json({error:'User not found'})
        }
    }catch(err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }
}

const getLoggedInUserDetails = async (req,res)=>{
    const id = req.params.id;

    try{
        const user = await User.findById(id);
        if(user){
            let {password,_id, updatedAt, __v, ...others} = user._doc;
            const links = await Link.find({userId:_id});
            others['links'] = links;
            res.status(200).json(others)
        }else{
            res.status(404).json({error:'User not found'})
        }
    }catch(err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }
}

const updateUser = async (req,res)=>{
    const token = req.headers.authorization;
    const body = req.body
    if(token){
        jwt.verify(token, process.env.JWT_ENCRYPTION_KEY, async(error, decodedToken)=>{
            if(error){
                res.status(400).json({error:"Invalid token, Please log in"})
            }else{
                try{
                    const user = await User.findByIdAndUpdate(decodedToken.id, body, {new:true})
                    if(user){
                        let {password,_id, updatedAt, __v, ...others} = user._doc;
                        res.status(200).json({user:others, message:'User updated successfully', success:true})
                    }else{
                        res.status(404).json({error:'User not found'})
                    }
                }catch(err){
                    const {status, ...others} = errorHandler(err);
                    res.status(status).json(others);
                }
            }
        })

       
    }else{

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

module.exports = {getUserDetails,getLoggedInUserDetails, updateUser, updatePassword};