const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const path = require('path');
const Article = require('./models/articles');


mongoose.connect('mongodb://localhost/blog');

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




app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/articles', articleRouter);


app.get('/', (req, res) => {
    res.render("articles/home");
})

app.get('/articles', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/articles', { articles })
    // res.render("articles/articles", {articles});
})

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})