const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// storing all data in local memory
const posts = {};

app.get('/posts', (req, res) => {
  console.log('GET to posts /posts');
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  console.log('POST to query /posts/create');
  const id = randomBytes(4).toString('hex');
  const { postContent } = req.body;

  posts[id] = {
    id,
    postContent,
    comments: []
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: posts[id]
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('POST to posts /events');
  res.send({});
});

app.listen(4000, () => {
  console.log('POSTS SRVC ON 4000');
});