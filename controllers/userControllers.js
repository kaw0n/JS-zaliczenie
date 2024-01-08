//const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = require('../router/blogRoutes');
const User = require('../models/User')
const Joi = require('joi')

const user_signup = async (req, res, next) => {
    try {
        const validationResult = validateUserData(req.body);

        if (validationResult.error) {
            return res.status(400).json({
                status: 'fail',
                message: 'Validation error',
                errors: validationResult.error,
            });
        }

        const newUser = await User.create(req.body);

        return res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

const validateUserData = (User) => {
    const errors = {};

    // Validate 'username'
    if (!User.username || typeof User.username !== 'string' || User.username.trim() === '') {
        errors.username = 'Username is required and must be a non-empty string';
    }

    // Validate 'email'
    if (!User.email || typeof User.email !== 'string' || !User.email.includes('@')) {
        errors.email = 'Email is required and must be a valid email address';
    }

    // Add more validation rules as needed for other properties

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
        return { error: errors };
    }

    // If no errors, return null
    return { error: null };
};

// const user_signup = async (req, res, next) => {

//    const newUser = await User.create(req.body);

//    res.status(201).json({
//     status: 'success',
//     data:{
//         user: newUser
//     }
//     });
// };



module.exports = {
    user_signup
}