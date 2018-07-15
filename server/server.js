const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const publicPath = path.join(__dirname, '..', 'public');
const {PORT, DATABASE_URL} = require('../config/config');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

mongoose.connect(DATABASE_URL, { useNewUrlParser: true});

var Post = mongoose.model('Post', {
  date: {
    type: Number
  },
  text: {
    type: String
  },
  score: {
    type: Number
  }
});

var newPost = new Post({
  text: "Ate bananas and sweet potatoes for lunch"
})

newPost.save().then((post) => {
  console.log('Saved Post', post)
}, (e) => {
  console.log('Unable to save post')
})

app.listen(PORT, () => {
  console.log('Server is up!');
});
