const express = require('express');
const BlogPost = require('../models/BlogPost');
const blogController = require('../controllers/blogController');

const router = express.Router(); 

router.get('/posts/:id', blogController.blog_find_id)
router.post('/posts/store', blogController.blog_create_post )
router.get('/posts/new', blogController.blog_create_get)
router.get('/post', blogController.blog_create_details)

router.get('/', (req, res) =>{
    res.render('index')
    
})

router.get('/account', (req, res) =>{
    res.render('account')
    
})

router.get('/contact', (req, res) =>{
    res.render('contact')
    
})


module.exports = router;

