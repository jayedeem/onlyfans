const express = require('express');
const router = express.Router();
const axios = require('axios');
const redisClient = require('../db/redis');
require('dotenv').config();

router.put('/api/rewardify/addcredit', async (req, res) => {
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
  const { email, amount, memo, expiresAt, token, userid } = req.body;
  // console.log(req.body);
  console.log('headers', req.headers);
  try {
    await axios.request({
      url: `/customer/${userid}/account/credit`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${rewardifyToken}`,
      },
      data: {
        email,
        amount,
        memo,
        expiresAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/api/rewardify/user/:id', async (req, res) => {
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

  try {
    const { id } = req.params;
    const data = await axios.get(
      `${process.env.REWARDIFY_URL}/customer/${id}/account`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${rewardifyToken}`,
        },
      }
    );

    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put('/api/rewardify/subcredit', (req, res) => {
  res.status(200).send({
    msg: "You've activated my trap card",
  });
});
router.put('/api/rewardify/resetcredit', (req, res) => {
  res.status(200).send({
    msg: "You've activated my trap card",
  });
});

module.exports = router;
