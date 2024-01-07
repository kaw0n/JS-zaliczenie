const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    model:{ 
    type: String,
    required: true
    },
    productionYear:{ 
        type: String,
        required: true
        },
    description: { 
        type: String,
        required: true
        }
},{ timestamps: true });

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
//module.exports = mongoose.model("carPost", carPostSchema)
module.exports = BlogPost;