const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const redisClient = require('../db/redis');

router.get('/api/dashboard', async (req, res) => {
  try {
    // const shopifyData = await axios.request({
    //   url: process.env.SHOPIFY_TOKEN_ACCESS_URL,
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json',
    //     authorization: 'Basic ' + process.env.SHOPIFY_X_TOKEN,
    //   },
    // });

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
