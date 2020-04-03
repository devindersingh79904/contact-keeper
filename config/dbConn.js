const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURL');

const connDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('connected to database');
  } catch (e) {
    console.error(e);
  }
};

module.exports = connDb;
