const express=require('express');
const app=express();
const articleRouter=require('./routes/articles');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost/8080/blog');

let articles = [
    {
        title: "Test title",
        createdAt: new Date(),
        description: "Test Description"
    },
    {
        title: "Test title",
        createdAt: new Date(),
        description: "Test Description"
    }
];
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use('/articles',articleRouter);
app.get('/articles',(req,res)=>{
    res.render("articles/index", {articles});
})

const port=8080;
app.listen(port,()=>{
    console.log(`Listening to port ${port}...`);
})