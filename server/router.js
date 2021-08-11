const express=require('express')
const auth= require('./Middleware/auth')
const {signup,login} =require('./Controllers/user')

const router = express.Router();

router.post('/signup',auth,signup);
router.post('/login',auth,login);

module.exports=router;