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
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  const id = req.params.id;

  try {
    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthoriged user' });
    }

    contact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: contactFields,
      },
      {
        new: true,
      }
    );

    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

//@Router Delete  /api/contacts/:id
// Description delete Exsiting contact
// ACCESS   Private
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthoriged user' });
    }

    contact = await Contact.findByIdAndRemove(id);

    res.json({ msg: 'Deleted Succussfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
