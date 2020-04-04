const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

//@Router GET /api/contacts
// Description Get all user's contacts
// ACCESS   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(501).json({ msg: 'Server error' });
  }
});

//@Router post /api/contacts
// Description Add new contacts
// ACCESS   Private
router.post(
  '/',
  [auth, [check('name', 'please enter a valid name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const { name, email, phone, type } = req.body;

    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type,
    });

    const contact = await newContact.save();
    res.send(contact + 'save succsfult');
    try {
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

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
