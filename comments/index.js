const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// {} over [] to facilitate commentId key lookups
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentid = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentid, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentid,
      content,
      postId: req.params.id,
    }
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  res.send({});
});

app.listen(4001, console.log('COMMENTS SRVC LISTENING ON PORT 4001'));