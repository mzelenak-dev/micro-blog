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

// GET ALL COMMENTS FOR POSTID
app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.send(comments);
});

// CREATE NEW COMMENT FOR POSTID
app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentid = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentid, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentid,
      content,
      postId: req.params.id,
      status: 'pending',
    }
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  res.send({});
});

app.listen(4001, console.log('COMMENTS SRVC LISTENING ON PORT 4001'));