const express=require('express')
const app=express()
const path=require('path')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
const Books=require('./model')
const port =process.env.PORT || 5000

const mongodb='mongodb://localhost:27017/Books'

app.use(express.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '..','client','build','index.html'))
})

app.get('/books',(req,res)=>{
    Books.find({},(err,books)=>{
        if(err){res.status(400).send(err)}
        res.status(200).send(books)
    })
})

app.post('/add',(req,res)=>{
    let body={
        Title:req.body.Title,
        Author:req.body.Author,
        Date:req.body.Date
    }
    let newBook=new Books(body)
    newBook.save().then(()=>{
        res.status(200).send('Book saved')
    }).catch(err=>{
        res.status(400).send('There is a problem: '+err)
    })
})

app.delete('/delete',(req,res)=>{

})

app.listen(port,()=>{
    console.log('Server is connected at port: '+port)
})

mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(
    ()=>{console.log('Database is Connected!!')},
    err=>{console.log('There is a problem: '+err)}
)