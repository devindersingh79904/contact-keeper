const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
//@Router POST /api/users
// Description Regitering a new user
// ACCESS   PUBLIC

router.post(
  '/',
  [
    check('name', 'Please enter a valid name').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Minimum 6 character req').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        console.log(user);
        res.status(400).json({ msg: 'User already exist ' });
        return;
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcryptjs.genSalt(10);

      user.password = await bcryptjs.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // console.log('Payload is ');
      // console.log(payload);

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          // console.log('token is ');
          // console.log(token);
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(Error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
