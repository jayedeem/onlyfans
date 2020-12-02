const express = require('express');
const axios = require('axios');
const router = express.Router();
const redisClient = require('../db/redis');

router.get('/', async (req, res) => {
  // Send data to frontend
  try {
    const cacheData = await redisClient.get('cacheData');
    const { shopify } = await JSON.parse(cacheData);
    // console.log(shopify.customers);
    return res.status(200).json({ api: shopify });
  } catch (error) {
    return res.status(500).json({
      err: {
        msg: 'Something went wrong',
      },
    });
  }
});

module.exports = router;
