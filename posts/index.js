const cors = require('cors');
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

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { postContent } = req.body;

  posts[id] = {
    id,
    postContent,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('listening on port 4000');
})