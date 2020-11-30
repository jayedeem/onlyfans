const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../db/redis');

router.get('/api/dashboard', (req, res) => {
  return res.send('hello');
});

module.exports = router;
