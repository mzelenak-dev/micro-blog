const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentid = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentid, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      content,
      id: commentid,
      status: 'pending',
      postId: req.params.id,
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const {type, data} = req.body;

  if(type === 'CommentModerated') {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => comment.id = id);

    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      }
    });
  }
  
  res.send({});
});

app.listen(4001, console.log('COMMENTS SRVC ON 4001'));