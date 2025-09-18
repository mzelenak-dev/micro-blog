const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// {} over [] to facilitate commentId key lookups
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const commentid = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentid, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, console.log('listening for comments on port 4001'));