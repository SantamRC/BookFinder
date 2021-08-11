const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken'); 
const user=require('../Models/user')

const login=async (req,res)=>{
    const {username,password}=req.body;
    const existingUser=await user.findOne({username});
    if(!existingUser) return res.status(404).json({message: 'User not found'});
    const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message:"Password Incorrect"});

    const token=await jwt.sign({username:existingUser.username,id:existingUser._id},'secret',{expiresIn:'1hr'});

    res.status(200).send({result:existingUser,token});
}

const signup=async (req,res)=>{
    try
    {
        const {username,password,name}=req.body;
        const existingUser=user.findOne({username})
        if(!existingUser) return res.status(400).json({message: 'User already Exists'});
        const hashedPassword= await bcrypt.hash(password,12);
        const newuser=new user({username:username,password:hashedPassword,name:name})
        newuser.save().then(()=>{
            return res.status(200).send('User Created')
        }).catch(err=>{
            res.status(400).send('There is a problem: '+err)
        })
    }catch(err) {
        return res.status(400).send(err)
    }
}


module.exports={login,signup}