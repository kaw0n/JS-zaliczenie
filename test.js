const mongoose = require('mongoose')
const carPost = require('./models/carPost')

//zmienne środowiskowe
//require('dotenv').config()

mongoose.connect('mongodb+srv://studia:studia1234@cluster0.idiqxqa.mongodb.net/?retryWrites=true&w=majority')

const carData = {
    model: 'Opel Astra',
    productionYear: '2012',
    description: 'Auto sprawne można jeździć'
  };
  
  carPost.create(carData)
    .then(carpost => {
      console.log(carpost);
    })
    .catch(error => {
      console.error(error);
    });