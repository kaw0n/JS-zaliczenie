const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique:true,
        lowercase : true,
       validate: [validator.isEmail, 'Please enter a valid email']
    },
    
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlenght: 8 ['password is to short'],
        // select: false
    },
});

const User = mongoose.model('User', UserSchema);

module.exports=User;