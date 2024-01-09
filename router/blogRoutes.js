const express = require('express');
const blogControllers = require('../controllers/blogControllers');
const checkAuth = require("../middleware/chechAuth");
const multer = require('multer');

const router = express.Router(); 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/post', blogControllers.blog_create_details)
router.get('/posts/new', checkAuth, blogControllers.blog_create_get)
router.post('/posts/store',checkAuth, upload.single('image'), blogControllers.blog_create_post )
router.get('/posts/:id', blogControllers.blog_find_id)
router.post('/posts/:id/delete', checkAuth, blogControllers.blog_deleteBlogPost)
router.get('/account', checkAuth, blogControllers.account_view)

router.get('/', (req, res) =>{
    res.render('index')
    
})

router.get('/error', (req, res) =>{
    res.render('error')
    
})

router.get('/contact', (req, res) =>{
    res.render('contact')
    
})




module.exports = router;

