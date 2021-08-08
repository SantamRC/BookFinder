const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken'); 
const user=require('../Models/user')

export const login=(req,res)=>{
    const {username,password}=req.body;
    const existingUser=user.findOne({username});
    if(!existingUser) return res.status(404).json({message: 'User not found'});
    const isPasswordCorrect=bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Password Incorrect"});

    const token=jwt.sign({username:existingUser.username,id:existingUser._id},'secret',{expiresIn:'1hr'});

    res.status(200).json({result:existingUser,token});
}

export const signup=(req,res)=>{
    const {username,password,name}=req.body;
    const existingUser=user.findOne({username})
    if(!existingUser) return res.status(400).json({message: 'User already Exists'});
    const hashedPassword=bcrypt.hash(password,12)
    const result=user.cr
}