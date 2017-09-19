const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../src/client/public'));


app.get('/fetchUrl', (req, res) => {
  res.send('url fetched');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});