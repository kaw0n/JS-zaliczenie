const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique:true,
        lowercase : true,
       validate: [validator.isEmail, 'Please enter a valid email']
    },
    // userType: {
    //     type: String,
    //     enum:['user','admin'],
    //     default: 'user'
    // },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlenght: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(val) {
                 return val === this.password;
                },
                message: "Passwords do not match"

        }
    }
});

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next;

   this.password = await bcrypt.hash(this.password, 12); 
    this.confirmPassword = undefined;
    next();
})
const User = mongoose.model('User', UserSchema);

module.exports=User;