const express = require('express');
const blogControllers = require('../controllers/blogControllers');
const multer = require('multer');
const userControllers = require('../controllers/userControllers');
const router = express.Router(); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/register/create',userControllers.user_create_view);
router.post('/register/login', userControllers.log_in_method);
router.post('/register', userControllers.create_user);
router.get('/login',userControllers.user_login_view);

module.exports = router;