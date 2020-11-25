const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcryptjs');

const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');
require('dotenv').config();

router.get('/', (req, res) => {
  res.status(400).send('/auth');
});

router.post('/register', async (req, res) => {
  // Validate Data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if user exists
  const emailExist = await Users.findOne({
    email: req.body.email,
  });

  if (emailExist)
    return res.status(400).send({
      message: 'Email Already Exists',
    });

  // Hash pw

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create user
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if email exists
  const user = await Users.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.status(400).send({
      message: 'Email or Password is wrong',
    });
  // Check password is valid

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send('Wrong password');
  res.send('Logged in');
});

module.exports = router;
