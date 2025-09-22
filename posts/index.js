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
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { postContent } = req.body;

  posts[id] = {
    id,
    postContent,
    comments: []
  };

  await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: posts[id]
    });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log('POSTS SRVC LISTENING ON PORT 4000');
})