const express = require('express');
const axios = require('axios');
const router = express.Router();
const redisClient = require('../db/redis');

router.get('/', async (req, res) => {
  const cacheData = await redisClient.get('cacheData');
  const { shopify } = await JSON.parse(cacheData);
  console.log(shopify.customers);
  return res.json({ api: shopify });
});

module.exports = router;
