const jwt = require('jsonwebtoken');
require('dotenv').config()

const maxAge = 30*24*60*60;
const createToken = (id)=>{
    const token = jwt.sign({id}, process.env.JWT_ENCRYPTION_KEY, {expiresIn:maxAge});
    return token;
}

module.exports = createToken