const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');


//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//ejs
app.set('view engine', 'ejs')

//DB

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

app.get('/', (req, res) =>{
    res.render('index')
    
})

app.get('/account', (req, res) =>{
    res.render('account')
    
})

app.get('/contact', (req, res) =>{
    res.render('contact')
    
})

app.get('/post', (req, res) =>{
    res.render('post')
    
})

app.get('/posts/new', (req, res)=>{
    res.render('create')
})
app.get('/posts/store', (req, res)=>{
    carPost.create(req.body, (error, carpost)=>{
        res.render('/posts')
    })
    
})


// app.get('/notfound', (req, res) =>{
//     res.render('notfound')
    
// })
