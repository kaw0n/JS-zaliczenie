const mongoose = require('mongoose')
const carPost = require('./models/carPost')

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