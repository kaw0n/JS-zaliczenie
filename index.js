const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('view engine', 'ejs')
//styles& scripts
app.use(express.static('public'));

app.listen(3000, () =>{
    console.log("app listening")
})

app.get('/', (req, res) =>{
    res.render('index')
    
})

app.get('/about', (req, res) =>{
    res.render('about')
    
})

app.get('/contact', (req, res) =>{
    res.render('contact')
    
})

app.get('/post', (req, res) =>{
    res.render('post')
    
})

// app.get('/notfound', (req, res) =>{
//     res.render('notfound')
    
// })

