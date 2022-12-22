const User = require('../models/user');
const express = require('express');

const femaleAvatarLink = 'https://drive.google.com/file/d/14xmXOYhrRm7qXuyG4AQ2dSvV6PSPviQ1/view?usp=share_link';
const maleAvatarLink = 'https://drive.google.com/file/d/1By5PbzvBp-QbwW6_QS4VgL90vmjkW3pP/view?usp=share_link';

const register = (req,res)=>{
    console.log(req.body);
}

const login = (req,res)=>{

}


module.exports = {register, login};