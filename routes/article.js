const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

const Article = require('./../models/blog_model');




//route to get the edit page
router.get('/edit/:id', async(req, res) => {
const article = await Article.findById(req.params.id);
res.render('../views/edit_article.ejs',{article:article});
});

//route to get the create article page
router.get('/new', (req, res) => {
res.render('../views/new.ejs',{article:new Article()});
});

//route to navigate to single article page
router.get('/:slug', async(req, res) => {
  const article = await Article.findOne({slug:req.params.slug});
  res.render('../views/show_article.ejs',{article:article});
});

//route to save article to database and redirect to single article page
router.post('/', (req, res, next) => {
req.article = new Article();
next()
} , SaveArticleAndRedirect('new.ejs'));


//route to handle the update for the edit page
router.put('/:id', async(req, res, next) => {
req.article = await Article.findById(req.params.id);
next()
}, SaveArticleAndRedirect('edit_article.ejs'));



function SaveArticleAndRedirect(path){
return async(req,res)=>{
  let article = req.article;
   article.title = req.body.title;
   article.description = req.body.description;
   article.markdown = req.body.markdown;

try {
     article = await article.save()
     res.redirect(`/article/${article.slug}`)
}catch (err) {
      res.render(`../views/${path}`,{article:article});
} 
}
}



router.delete('/:id', async(req, res) => {
await Article.findByIdAndDelete(req.params.id)
 res.redirect('/');
});
module.exports = router;