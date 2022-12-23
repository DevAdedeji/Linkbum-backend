require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const linkRoutes = require('./routes/link');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DBURL)
.then(result=>{
    console.log("Connected to DB");
    app.listen("3000", ()=>{
        console.log("Server working....")
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/link', linkRoutes)