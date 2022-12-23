const User = require('../models/user');
const errorHandler = require('../utils/errorHandler')

const getUserDetails = async (req,res)=>{
    const username = req.params.slug;
    try{
        const user = await User.findOne({username});
        const {password,_id, updatedAt, ...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
        const {status, ...others} = errorHandler(err);
        res.status(status).json(others);
    }
}

module.exports = {getUserDetails};