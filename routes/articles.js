const express = require('express');
const router = express.Router();
const Article = require('./../models/articles');


router.get('/new', (req, res) => {
    res.render("articles/new", {

        article: new Article()

    });
})


router.post('/', async (req, res, next) => {
    req.article=new Article();
    next();
}, saveArticleAndRedirect('new'))


router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    });
    if (article == null) {
        res.redirect('/');
    }
    res.render('articles/show', {
        
        article: article 
    
    });
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {
         
        article: article 
    
    });
})

router.put('/:id', async(req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('new'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;

        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;

        try {
            await article.save();
            // res.redirect(`/articles/${article.slug}`);
            res.redirect(`/articles`);
        } catch (e) {
            console.log(e);
            res.render(`articles/${path}`, {
                
                article: article 
            
            });
        }
    }
}


router.get('/about', (req, res) => {
    res.render('articles/about');
})

module.exports = router;