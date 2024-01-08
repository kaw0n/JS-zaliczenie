const express = require('express');
const blogControllers = require('../controllers/blogControllers');
const multer = require('multer');
const userControllers = require('../controllers/userControllers');
const router = express.Router(); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/signup', userControllers.user_signup)

module.exports = router;