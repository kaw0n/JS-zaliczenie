//const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = require('../router/blogRoutes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

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
  create_user
}