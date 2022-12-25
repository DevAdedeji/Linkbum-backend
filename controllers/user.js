const User = require('../models/user');
const Link = require('../models/link')
const errorHandler = require('../utils/errorHandler')

const getUserDetails = async (req,res)=>{
    const username = req.params.slug;
    try{
        const user = await User.findOne({username});
        if(user){
            let {password,_id, updatedAt, __v, ...others} = user._doc;
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

module.exports = {getUserDetails};