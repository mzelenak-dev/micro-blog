const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const {type, data} = req.body;
  const commentContent = data.content;

  if(type === 'CommentCreated') {
    const status = commentContent.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        status,
        id: data.id,
        postId: data.postId,
        content: commentContent,
      }
    })
  }

  res.send({});
});

app.listen(4003, () => { console.log('MODERATION SRVC ON 4003')});