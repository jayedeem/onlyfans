const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.put('/api/rewardify/addcredit', async (req, res) => {
  const { email, amount, memo, expiresAt, token, userid } = req.body;
  console.log(req.body);

  try {
    await axios
      .request({
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
      })

      .then((data) => console.log(data));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get('/api/rewardify/retrieveme', (req, res) => {
  res.status(200).send({
    msg: "You've activated my trap card",
  });
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
