const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const morgan = require('morgan');

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//ejs
app.set('view engine', 'ejs')

//middleware & stati
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
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

app.get('/post', async (req, res) => {
    const blogpostID = req.query.id; // Check if the ID is in the query params

    if (blogpostID) {
        // Redirect to the specific post page using the ID
        res.redirect(`/posts/${blogpostID}`);
        return;
    }

    // Retrieve all blog posts
    const blogposts = await BlogPost.find({});

    // Render the 'post' template passing the blogposts data
    res.render('post', {
        blogposts
    });
});


app.get('/posts/new', (req, res)=>{
    res.render('create')
})
//app.post('/posts/store', async (req, res)=>{
//    await BlogPost.create(req.body , (error,blogpost)=>{
//        res.redirect('/blogs')
//    })
//    
//})

app.post('/posts/store', async (req, res) => {
    console.log(req.body);

    try {
        // Create a new BlogPost instance with data from req.body
        const newBlogPost = new BlogPost({
            model: req.body.model,
            productionYear: req.body.productionYear,
            description: req.body.description,
            // Add other fields as needed
        });
        
        // Save the new blog post to the database
        await newBlogPost.save();

        // Redirect to the blogs page after successful creation
        res.redirect('/post');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating blog post:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/posts/:id', async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id);
  
    if (!blogPost) {
      return res.status(404).send('Post not found');
    }
  
    // Pass the specific post data to the 'single-post' template
    res.render('single-post', {
      blogPost
    });
  });

// app.post('/posts/store', async (req, res) => {
//     try {
//         // Assuming req.body contains the necessary fields for your BlogPost model
//         const newBlogPost = new BlogPost(req.body);
        
//         // Save the new blog post to the database
//         await newBlogPost.save();

//         // Redirect to the blogs page after successful creation
//         res.redirect('/post'); // Assuming '/posts' is the correct route for displaying all posts
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error('Error creating blog post:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// app.get('/notfound', (req, res) =>{
//     res.render('notfound')
    
// })
