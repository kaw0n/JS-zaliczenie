//const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = require('../router/blogRoutes');
const fs = require('fs').promises;


const blog_create_get =(req, res) => {
    res.render('create');
};


const blog_create_post = async (req, res) => {
    try {
        const { model, productionYear, description } = req.body;
        
        const userId = req.body.userId

        // Check if an image file was uploaded
        const imageData = req.file ? req.file.buffer : undefined;

        // Create a new BlogPost instance with data from req.body and imageData
        const newBlogPost = new BlogPost({
            model,
            productionYear,
            description,
            imageData,
            userId,
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
};

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


const blog_deleteBlogPost = async (req, res) => {
    try {
        // Extract the ID of the post to be deleted from the request's URL path
        const blogPostId = req.params.id;

        // Find the blog post with the specified ID
        const blogPost = await BlogPost.findByIdAndDelete(blogPostId);

        if (!blogPost) {
            return res.status(404).send('Post not found');
        }

        // If the deletion was successful, redirect to the 'post' route
        res.redirect('/post');
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).send('Internal Server Error');
    }
};


const account_view = (req, res) => {
    // Pass authentication status and user data to the view
    const isAuthenticated = req.user !== undefined;
    
    // Render the account page with the authentication status and user data
    res.render('account', { isAuthenticated, user: req.user });
  };

module.exports = {
    blog_create_get,
    blog_create_details,
    blog_create_post,
    blog_find_id,
    blog_deleteBlogPost,
    account_view
}