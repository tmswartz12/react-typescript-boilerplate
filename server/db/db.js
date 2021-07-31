const mongoose = require('mongoose');
const { serverConfig } = require('../config');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connect(serverConfig.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('DB CONNECTED', serverConfig.mongoURL);
});


module.exports = db
;
