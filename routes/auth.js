const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const router = express.Router();

//@Router GET /api/auth
// Description Regitering a new user
// ACCESS   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: 'unauthoriges' });
  }
});

//@Router POST /api/auth
// Description login a user
// ACCESS   PUBLIC
router.post(
  '/',
  [
    check('email', 'please enter a valid email address').isEmail(),
    check('password', 'password mus be 6 digit long').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
      return;
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid cradential' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid cradential' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
