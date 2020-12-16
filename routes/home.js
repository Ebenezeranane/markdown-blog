const express = require('express');
const router = express.Router();

const Article = require('../models/blog_model');

router.get('/', async(req, res) => {
const article = await Article.find().sort(
    {createdAt:'desc'}
);
res.render('../views/index.ejs',{articles:article});
});

module.exports = router;