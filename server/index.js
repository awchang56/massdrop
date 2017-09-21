const express = require('express');
const Site = require('../database');
const axios = require('axios');
const bodyParser = require('body-parser');
const validate = require("validate.js");
const sha1 = require('sha1');
const processJobs = require('./htmlFetcher');
const JobQueue = require('./JobQueue');

const jobQueue = new JobQueue();
const app = express();

setInterval(processJobs.bind(this, jobQueue), 15000);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../src/client/public'));

app.post('/url/', (req, res) => {
  let url = req.body.url;
  let protocolIndex = url.indexOf('://');
  if (protocolIndex < 0) {
    url = ('http://' + url);
  }
  if (validate({website: url}, {website: {url: true}})) {
    res.status(400).send('invalid URL');
  } else {
    let jobID = sha1(url);

    Site.find({jobID: jobID})
      .then(response => {
        if (response.length > 0) {
          res.status(200).send('already fetched');
        } else {
          jobQueue.enqueue(url);
          new Site({url: url, jobID: jobID, html: 'Please try again soon. We are still fetching the html.'})
            .save((err, doc) => {
              res.status(200).send(doc);
            })
            .catch(err => {
              res.status(400).send('error saving html to DB');
            });
        }
      })
      .catch(err => {
        res.status(400).send('error looking for duplicate jobID');
      });
  }
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