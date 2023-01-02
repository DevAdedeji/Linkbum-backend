const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const errorHandler = require('../utils/errorHandler');
const createToken = require('../utils/createToken');

const femaleAvatarLink = 'https://www.kindpng.com/picc/m/22-224485_female-avatar-hd-png-download.png';
const maleAvatarLink = 'https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png';
const othersAvatarLink = 'https://www.kindpng.com/picc/m/73-734169_transparent-finger-circle-png-accept-others-png-download.png'

const register = async (req,res)=>{
    let {gender, profilePic, email, username} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if(gender.toLowerCase() === 'male'){
        profilePic = maleAvatarLink;
    }else if(gender.toLowerCase()==='female'){
        profilePic = femaleAvatarLink;
    }else{
        profilePic = othersAvatarLink;
    } 
   
    try{
        const user = await User.create({email,username, gender, profilePic, password:hashedPassword})
        res.status(201).json({message:'User created successfully', success:true});
    }catch(err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }


}

const login =async (req,res)=>{
    const {password, username} = req.body;
   
    try{
        const user = await User.findOne({username});
        if(user){
            const auth = await bcrypt.compare(password, user.password)
            
            if(auth){
                const {password, ...others} = user._doc;
                const token = await createToken(user._id);

                user.accessToken = token
                await user.save()

                res.status(200).json({user:others, token:token, success:true})
            }else{
                res.status(400).json({error:'Password not correct'})
            }
        }else{
            res.status(400).json({error:'User not found'})
        }
    }catch (err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }
   
}


module.exports = {register, login};