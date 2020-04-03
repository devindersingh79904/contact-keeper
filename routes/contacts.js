const express = require('express');
const router = express.Router();

//@Router GET /api/contacts
// Description Get all user's contacts
// ACCESS   Private
router.get('/', (req, res) => {
  res.send('GET all contacts');
});

//@Router post /api/contacts
// Description Add new contacts
// ACCESS   Private
router.post('/', (req, res) => {
  res.send('Add a new contacts');
});

//@Router put /api/contacts/:id
// Description update Exsiting contact
// ACCESS   Private
router.put('/:id', (req, res) => {
  res.send('Update contact ');
});

//@Router Delete  /api/contacts/:id
// Description delete Exsiting contact
// ACCESS   Private
router.delete('/:id', (req, res) => {
  res.send('delete contact ');
});

module.exports = router;
