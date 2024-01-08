const express = require('express');
//const BlogPost = require('../models/BlogPost');
const blogControllers = require('../controllers/blogControllers');

const router = express.Router(); 

router.get('/post', blogControllers.blog_create_details)
router.get('/posts/new', blogControllers.blog_create_get)
router.post('/posts/store', blogControllers.blog_create_post )
router.get('/posts/:id', blogControllers.blog_find_id)
router.post('/posts/:id/delete', blogControllers.blog_deleteBlogPost)



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

