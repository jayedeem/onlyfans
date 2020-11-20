const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get('/api/dashboard', async (req, res) => {
  try {
    const shopifyData = await axios.request({
      url: process.env.SHOPIFY_TOKEN_ACCESS_URL,
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: 'Basic ' + process.env.SHOPIFY_X_TOKEN,
      },
    });
    const rewardifyToken = await axios.request({
      method: 'POST',
      url: `https://api.rewardify.ca/oauth/v2/token`,
      headers: {
        'Content-type': 'application/json',
      },
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
      data: {
        grant_type: 'client_credentials',
      },
    });
    const data = {
      token: rewardifyToken.data,
      shopify: shopifyData.data,
    };
    // res.send(data);
    const accessToken = jwt.sign(data.token, process.env.ACCESS_TOKEN_SECRET);
    res.send({ accessToken: accessToken, users: data.shopify });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
