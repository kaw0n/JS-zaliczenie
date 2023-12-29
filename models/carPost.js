const mongoose = require('mongoose');
const Schema = mongoose.Schema;

if(mongoose){
    console.log('db connected')
}
else{
    console.log()
}


const carPostSchema = new Schema({
    model: String,
    productionYear: String,
    description: String
})

module.exports = mongoose.model("carPost", carPostSchema)