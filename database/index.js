const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/sites');

db.on('error', () => {
  console.log('error connecting to mongoose');
});

db.once('open', () => {
  console.log('mongoose connection established');
})

const siteSchema = new mongoose.Schema({
  jobID: {type: String, index: {unique: true}},
  url: String,
  html: String
});

const Site = db.model('Site', siteSchema);

module.exports = Site;