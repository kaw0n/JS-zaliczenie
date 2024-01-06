const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');


//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//ejs
app.set('view engine', 'ejs')

//DB

//}
  require('dotenv').config()
//mongoose.connect(process.env.DB_URL)
//if(mongoose){
//    console.log("Connected to DB")
//}else{
//    console.log("Failed to connect to DB")
//}

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

// app.get('/post', (req, res) =>{
    // res.render('post')
    
// })

 app.get('/post', async (req, res) =>{
     const blogposts = await BlogPost.find({})
   res.render('post',{
       blogposts
   })
}) 


app.get('/posts/new', (req, res)=>{
    res.render('create')
})
//app.post('/posts/store', async (req, res)=>{
//    await BlogPost.create(req.body , (error,blogpost)=>{
//        res.redirect('/blogs')
//    })
//    
//})

app.get('/post/store', async (req, res) => {
    try {
        // Assuming req.body contains the necessary fields for your BlogPost model
        const newBlogPost = new BlogPost(req.body);
        
        // Save the new blog post to the database
        await newBlogPost.save();

        // Redirect to the blogs page after successful creation
        res.redirect('/blogs');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating blog post:', error);
        res.status(500).send('Internal Server Error');
    }
});


// app.get('/notfound', (req, res) =>{
//     res.render('notfound')
    
// })
