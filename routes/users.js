const express = require('express');
const router = express.Router();

//@Router POST /api/users
// Description Regitering a new user
// ACCESS   PUBLIC

router.post('/', (req, res) => {
  res.send('this is users ragistration ');
});

module.exports = router;
