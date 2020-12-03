const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.status(400).send('/auth');
});

router.post('/register', authController.registerAuth);

router.post('/login', authController.loginAuth);

module.exports = router;
