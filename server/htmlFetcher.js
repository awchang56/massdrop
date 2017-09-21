const Site = require('../database');
const axios = require('axios');
const jobQueue = require('./jobQueue');

const updateHTML = (url, html) => {
  Site.findOneAndUpdate(
    {url: url},
    {html: html},
    {upsert: false, new: true},
    (err, doc) => {
      if (err) {
        console.log('error updating document in DB: ', err);
      }
    })
}

const fetchHTML = (url) => {
  axios.get(url)
    .then(response => {
      updateHTML(url, response.data);
    })
    .catch(err => {
      console.log('invalid url, error code: ', err.code);
      updateHTML(url, 'Invalid URL');

    });
};


const processJobs = (jobQueue) => {
  while (jobQueue.size() > 0) {
    fetchHTML(jobQueue.dequeue());
  }
}

module.exports = processJobs;
