const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carPostSchema = new Schema({
    model: String,
    productionYear: String,
    description: String
})

const carPost= mongoose.model("carPost", carPostSchema)
//module.exports = mongoose.model("carPost", carPostSchema)
module.exports = carPost;