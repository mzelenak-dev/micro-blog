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

  console.log(`Event ${JSON.stringify(event.type)} processed`);

  axios.post('http://localhost:4000/events', event).catch(err => console.log('EV-BUS Error posting to :4000', err));
  axios.post('http://localhost:4001/events', event).catch(err => console.log('EV-BUS Error posting to :4001', err));
  axios.post('http://localhost:4002/events', event).catch(err => console.log('EV-BUS Error posting to :4002', err));
  axios.post('http://localhost:4003/events', event).catch(err => console.log('EV-BUS Error posting to :4003', err));

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('EVENT-BUS ON 4005');
});