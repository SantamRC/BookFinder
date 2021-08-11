const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,'secret',(err,decoded)=>{
        if(err) {
            res.send('Failed Authorization')
            res.end()
        }
        next()
    });    
}

module.exports=auth;