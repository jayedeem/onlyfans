const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../db/redis');

router.get('/api/dashboard', async (req, res) => {
  try {
    const rewardifyToken = await redisClient.get(
      'rewardifyToken',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          return result;
        }
      }
    );
    const shopifyData = await redisClient.get('shopifyData', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return result;
      }
    });
    const data = {
      token: rewardifyToken,
      shopify: shopifyData,
    };
    // console.log('data', data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
