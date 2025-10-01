const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if(type === 'PostCreated') {
    const {id, postContent} = data;
    posts[id] = { id, postContent, comments: [] };
  }
  if(type === 'CommentCreated') {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    
    post.comments.push({id, content, status});
  }
  if(type === 'CommentUpdated') {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);
    
    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', (req, res) => {
  console.log('GET to query /posts');
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('POST to query /events');
  const {type, data} = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('QUERY SRVC ON 4002');
  
  // try to pull all existing events from EVBUS data store
  try {
    console.log('attempted to sync all events on event bus');
    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let event of res.data) {
      console.log(`Processing event ${JSON.stringify(event)}`);
      handleEvent(event.type, event.data);
    }
  } catch(err) {
    console.error(err);
  }
})