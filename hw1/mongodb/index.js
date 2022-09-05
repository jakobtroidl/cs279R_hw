const mongoose = require('mongoose');
const settings = require('../controllers/settings')

/**
 * Connects to the MongoDB database
 */
function connectMongoDb() {
    mongoose.connect(settings.dbURI, { // retrieve dB URI from settings
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:')); // log error
    db.once('open', () => {
      console.log('[INFO] Connect to DB success!'); // if connection successful, log success
    });
}

module.exports.connectMongoDb = connectMongoDb // export connectMongoDb function