const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const {type, data} = req.body;
  
  if(type === 'PostCreated') {
    const {id, title} = data;
    posts[id] = { id, title, comments: [] };
  }
  if(type === 'CommentCreated') {
    const {id, content, postId} = data;
    const post = posts[postId];
    if(posts.comments && Array.isArray(posts.comments)) {
      posts.comments.push({id, content});
    } else {
      posts.comments = [];
    }
  }

  res.send({});
});

app.listen(4002, () => { console.log('QUERY SRVC LISTENING ON PORT 4002') })