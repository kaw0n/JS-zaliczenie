const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    model: String,
    productionYear: String,
    description: String,
    
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema)
//module.exports = mongoose.model("carPost", carPostSchema)
module.exports = BlogPost;