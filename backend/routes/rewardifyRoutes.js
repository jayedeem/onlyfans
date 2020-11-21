const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.put('/api/rewardify/addcredit', async (req, res) => {
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
        authorization: `Bearer ${token}`,
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
  const { token } = req.headers;
  const { id } = req.params;
  console.log('retrieveme headers', token);
  console.log('retrieveme params', id);
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
