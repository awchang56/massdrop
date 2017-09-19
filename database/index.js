const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sites');
const db = mongoose.connection;

db.on('error', () => {
  console.log('error connecting to mongoose');
});

db.once('open', () => {
  console.log('mongoose connection established');
})

const siteSchema = mongoose.Schema({
  jobID: {type: Number, index: {unique: true}},
  html: String
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;