const express = require('express');
const Site = require('../database');
const axios = require('axios');
const sha1 = require('sha1');

const app = express();

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(express.static(__dirname + '/../src/client/public'));

app.get('/url/:url', (req, res) => {
  let url = req.params.url;
  let protocolIndex = url.indexOf('://');
  if (protocolIndex < 0) {
    url = ('http://' + url);
  }
  let jobID = sha1(url);
  Site.find({jobID: jobID})
    .then(response => {
      if (response.length > 0) {
        res.status(200).send('already fetched');
      } else {
        axios.get(url)
          .then(response => {
            new Site({jobID: jobID, url: url, html: response.data})
              .save((err, doc) => {
                res.status(200).send(doc);
              })
              .catch(err => {
                res.status(400).send('error saving html to DB');
              });
          })
          .catch(err => {
            res.status(400).send('error fetching url');
          });
      }
    })
    .catch(err => {
      res.status(400).send('error looking for duplicate jobID');
    });
});

app.get('/job/:id', (req, res) => {
  let jobID = req.params.id;
  Site.find({ jobID: jobID})
    .then(response => {
      if (response.length === 0) {
        res.status(400).send('Please try again soon. We are still fetching the html.')
      } else {
        res.status(200).send(response[0])
      }
    })
    .catch(err => {
      res.status(400).send('error retrieving html from DB');
    });
});

app.get('/job', (req, res) => {
  Site.find()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send('error retrieiving all jobs from database');
    });
});