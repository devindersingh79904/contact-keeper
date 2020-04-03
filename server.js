const express = require('express');
const auth = require('./routes/auth');
const users = require('./routes/users');

const connDb = require('./config/dbConn');

connDb();

const app = express();

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send({ msg: 'welcome to node js' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is start on port 5000'));
