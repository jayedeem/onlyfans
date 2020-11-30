const express = require('express');
const router = express.Router();
const axios = require('axios');
const redisClient = require('../db/redis');
require('dotenv').config();

// Get User Details from Rewardify based on params
router.get('/user/:id', async (req, res, next) => {
  try {
    const cacheData = await redisClient.get('cacheData');
    const { rewardifyTokenData } = await JSON.parse(cacheData);
    const { id } = req.params;
    const { data } = await axios.get(
      `${process.env.REWARDIFY_URL}/customer/${id}/account`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${rewardifyTokenData}`,
        },
      }
    );
    // Data from rewardify comes as an Object
    if (!data) {
      return res.status(404).send('No user found');
    }
    // const user = Object.entries(data); Need to parse Object to array? Front or backend?
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

// router.put('/api/rewardify/addcredit', async (req, res) => {
//   const rewardifyToken = await redisClient.get(
//     'rewardifyToken',
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         return result;
//       }
//     }
//   );
//   const { email, amount, memo, expiresAt, token, userid } = req.body;
//   // console.log(req.body);
//   console.log('headers', req.headers);
//   try {
//     await axios.request({
//       url: `/customer/${userid}/account/credit`,
//       method: 'PUT',
//       baseURL: 'https://api.rewardify.ca/',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${rewardifyToken}`,
//       },
//       data: {
//         email,
//         amount,
//         memo,
//         expiresAt,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// });

// router.put('/api/rewardify/subcredit', (req, res) => {
//   res.status(200).send({
//     msg: "You've activated my trap card",
//   });
// });
// router.put('/api/rewardify/resetcredit', (req, res) => {
//   res.status(200).send({
//     msg: "You've activated my trap card",
//   });
// });

module.exports = router;
