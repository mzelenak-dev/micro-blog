const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Event Received:', event.type);
  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('EVENT-BUS LISTENING ON PORT 4005');
});