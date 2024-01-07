const express = require('express');
const BlogPost = require('../models/BlogPost');


const blog_create_get = (req, res) => {
    res.render('create')
}

const blog_create_post = async (req, res) => {
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
}

const blog_create_details = async (req, res) => {
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
}

const blog_find_id = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id);
  
    if (!blogPost) {
      return res.status(404).send('Post not found');
    }
  
    // Pass the specific post data to the 'single-post' template
    res.render('single-post', {
      blogPost
    });

}

module.exports = {
    blog_create_get,
    blog_create_details,
    blog_create_post,
    blog_find_id
}