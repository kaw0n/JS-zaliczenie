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
    res.sendFile(path.resolve(__dirname, 'index.html'))
    
})

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'about.html'))
    
})

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'contact.html'))
    
})

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'notfound.html'))
    
})