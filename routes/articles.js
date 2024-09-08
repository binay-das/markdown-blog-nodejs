const express = require('express');
const router = express.Router();
const Article = require('./../models/articles');

router.get('/new', (req, res) => {
    res.render("articles/new");
})

// router.get('/test', (req, res) => {
//     res.send("Inside articles page");
// })

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })

    try {
        await article.save();
        // res.redirect(`/articles/${article.id}`);
        res.redirect(`/`);
    } catch (e) {
        res.render(`articles/new`, { article: article });
    }
})

router.get('/:id', (req, res) => {

})

module.exports = router;