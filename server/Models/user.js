const mongoose = require('mongoose')
const Schema=mongoose.Schema

let user=new Schema({
    username:{
        type:String
    },
    name:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports=mongoose.model('user',user);