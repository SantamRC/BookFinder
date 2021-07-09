const mongoose = require('mongoose')
const Schema=mongoose.Schema

let Books=new Schema({
    Title:{
        type:String
    },
    Author:{
        type:String
    },
    Date:{
        type:Date
    }
})

module.exports=mongoose.model('Books',Books);