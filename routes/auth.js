const express = require('express');
const router = express.Router();

//@Router GET /api/auth
// Description Regitering a new user
// ACCESS   Private
router.get('/', (req, res) => {
  res.send('GET logged in users');
});

//@Router POST /api/auth
// Description Regitering a new user
// ACCESS   PUBLIC
router.post('/', (req, res) => {
  res.send('Log in Users');
});

module.exports = router;
