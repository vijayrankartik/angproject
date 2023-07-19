const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post');
const post = require('./models/post');
//const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://kartikvijayran:livvOjREIj52OAwO@cluster0.xpt20n3.mongodb.net/?retryWrites=true&w=majority"
   ).then(() => {
      console.log("Connected to database")
   }).catch(() => {
      console.log("Connection lost")
   })

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*")
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
   next()
})

app.get('/api/posts',(req, res, next) => {
   //   const posts = [{
   //      id: 'ABC123',
   //      title: 'First server-side post',
   //      content: 'this is coming from the server'
   //   },
   //   {
   //      id: 'AB4C56',
   //      title: 'Second server-side post',
   //      content: 'this is also coming from the server'
   //   },
   //  ]
   // const post = post.get();
   post.find().then((documents) => {
      res.status(200).json({
         message: "successfull",
         posts: documents
       })
   })
   //  res.status(200).json({
   //    title: post.title,
   //    content: post.content
   //    //   message: "successfull",
   //    //   posts: posts
   //  })
});

app.get("/api/posts/:id", (req, res, next) => {
   Post.findById(req.params.id
      ).then((post) => {
         if(post){
            res.status(200).json(post)
         }
         else{
            res.status(404).json({message: "not found"})
         }
      })
})

app.post("/api/posts", (req, res, next) => {
   const post = new Post({
      title: req.body.title,
      content: req.body.content
   })
   // console.log(post)
   post.save().then((createdPost) => {
      res.status(201).json({
         message: "Post addedd scuccessfully",
         postId: createdPost._id
      })
   })
   // res.status(201).json({
   //    message: "Post addedd scuccessfully"
   // })
})

app.delete("/api/posts/:id", (req, res, next) => {
   post.deleteOne({
      _id: req.params.id
   }).then(result => {
      console.log(result)
      res.status(200).json({
         message: "Post deleted"
      })
   })
})

app.patch("/api/posts/:id", (req, res, next) => {
   const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
   })
   Post.updateOne({
      _id: req.params.id
   }, post).then((result) => {
      // console.log(result)
      res.status(200).json({message: "Post updated successfully"})
   })
})

module.exports = app;