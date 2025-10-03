const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.get('/events', (req, res) => {
  res.send(events);
});

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios
    .post('http://posts-srv:4000/events', event)
    .catch((err) =>
      console.error('EV-BUS Error posting to posts-srv:4000', err)
    );
  axios
    .post('http://comments-srv:4001/events', event)
    .catch((err) => console.error('EV-BUS Error posting to :4001', err));
  axios
    .post('http://query-srv:4002/events', event)
    .catch((err) => console.error('EV-BUS Error posting to :4002', err));
  axios
    .post('http://moderation-srv:4003/events', event)
    .catch((err) => console.error('EV-BUS Error posting to :4003', err));

  console.log(`Event ${JSON.stringify(event.type)} processed`);

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('EVENT-BUS ON 4005');
});
