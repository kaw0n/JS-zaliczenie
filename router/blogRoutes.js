const express = require('express');
//const BlogPost = require('../models/BlogPost');
const blogControllers = require('../controllers/blogControllers');
const multer = require('multer');
const userControllers = require('../controllers/userControllers');

const router = express.Router(); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/post', blogControllers.blog_create_details)
router.get('/posts/new', blogControllers.blog_create_get)
router.post('/posts/store',upload.single('image'), blogControllers.blog_create_post )
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

