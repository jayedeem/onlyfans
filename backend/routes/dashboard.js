const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../db/redis');

router.get('/api/dashboard/1', (req, res, next, data) => {
  console.log(req.cached.api);
});

module.exports = router;
