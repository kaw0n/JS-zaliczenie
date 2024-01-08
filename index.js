const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const morgan = require('morgan');
const blogRoutes = require('./router/blogRoutes');
const userRoutes = require('./router/userRoutes');

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// blog routes
app.use(blogRoutes);

//ejs
app.set('view engine', 'ejs')

//middleware & stati
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
//DB

//}
  require('dotenv').config()


mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.idiqxqa.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority")
if(mongoose){
    console.log('db connected')
}
else{
    console.log('error connecting')
}

//styles& scripts
app.use(express.static('public'));

app.listen(3000, () =>{
    console.log("app listening")
})
