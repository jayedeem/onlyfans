const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();

router.get('/api/redirect', async (req, res) => {
  res.redirect('/users');
});

module.exports = router;
