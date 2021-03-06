const express=require('express')
require('dotenv').config()
const app=express()
const path=require('path')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
const Books = require("./Models/books");
const user = require("./Models/user");
const cors = require("cors");
const router = require("./router");
const port = process.env.PORT || 5000;
const auth = require("./Middleware/auth");
const { signup, login } = require("./Controllers/user");

const mongodb = `${process.env.DB}`;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", signup);
app.post("/login", login);
app.get("/token", auth, (req, res) => {
  res.send("Authorized");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/books/:username", (req, res) => {
  Books.find({ username: req.params.username }, (err, books) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).send(books[0].Books);
  }).catch((err) => {
    res.send("There is a problem: " + err);
  });
  res.send({});
});

app.post("/add/:username",auth, (req, res) => {
  let data = {
    Title: req.body.Title,
    Author: req.body.Author,
    Date: req.body.Date,
  };
  Books.updateOne(
    { username: req.params.username },
    { $push: { Books: data } },
    { upsert: true },
    (err, success) => {
      if (err) {
        console.log("There is a problem: " + err);
      } else {
        res.send("Book Added");
      }
    }
  );
});

app.delete('/delete/:username/:id',(req,res)=>{
   Books.updateOne(
       { username: req.params.username},
       {$pull:{Books:{_id:req.params.id}}},
       (err,success)=>{
        if(err) {
            console.log("There is a problem: " + err)
        }
      }
   )
   Books.findOne({username: req.params.username}).then(result => {
     res.send(result.Books)
   })
})

app.listen(port,()=>{
    console.log('Server is connected at port: '+port)
})

mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(
    ()=>{console.log('Database is Connected!!')},
    err=>{console.log('There is a problem: '+err)}
)
