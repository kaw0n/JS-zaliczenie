const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost');

const BlogData = {
    model: 'Opel Astra',
    productionYear: '2012',
    description: 'Auto sprawne można jeździć'
  };
  
  BlogPost.create(BlogData)
    .then(blogposts => {
      console.log(blogposts);
    })
    .catch(error => {
      console.error(error);
    });