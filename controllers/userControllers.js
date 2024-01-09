//const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = require('../router/blogRoutes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const user_login_view =(req,res) =>{
  res.render('login');
}

const log_in_method = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // // Check if the password exists and is a string
    if (!user.password || typeof user.password !== 'string') {
      return res.status(500).json({ error: 'Invalid user password' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If authentication succeeds, you may choose to generate a token, set a session, or perform other actions

    res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create_user = async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
  
      // Check if the password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create a new user instance
      const newUser = new User({
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
      const user_create_view =(req, res) => {
        res.render('register');
    };





module.exports = {
  user_create_view,
  create_user,
  user_login_view,
  log_in_method
}