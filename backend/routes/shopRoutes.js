const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();

router.get('/api/shopify/:id', async (req, res) => {
  const { token } = req.headers;
  const { id } = req.params;

  try {
    const data = await axios.get(
      `${process.env.REWARDIFY_URL}/customer/${id}/account`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
