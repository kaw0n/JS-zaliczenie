const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    productionYear: {
        type: "number",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageData: {
        type: Buffer, // Store image data as Buffer
    },
    creatorId: {
        type: String, // Reference to the User model
        required: true,
    },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;