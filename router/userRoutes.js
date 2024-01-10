const express = require('express');
const multer = require('multer');
const userControllers = require('../controllers/userControllers');
const router = express.Router(); 
const checkAuth = require("../middleware/chechAuth");
const checkLogged = require("../middleware/checkLogged")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/register/create', checkLogged, userControllers.user_create_view);
router.post('/register/login', checkLogged, userControllers.log_in_method);
router.post('/register', userControllers.create_user);
router.get('/login',userControllers.user_login_view);
router.post('/logout',checkAuth, userControllers.logout);

module.exports = router;