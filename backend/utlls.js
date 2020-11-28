const CronJob = require('cron').CronJob;
const axios = require('axios');
const redisClient = require('./db/redis');

const getToken = new CronJob('* * * * * ', async () => {
  try {
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

    const shopifyData = await axios.request({
      url: process.env.SHOPIFY_TOKEN_ACCESS_URL,
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: 'Basic ' + process.env.SHOPIFY_X_TOKEN,
      },
    });

    const rewardifyTokenData = rewardifyToken.data.access_token;

    const shopify = shopifyData.data;

    const set = (key, value) => {
      redisClient.set(key, JSON.stringify(value), 'ex', 3600);
    };

    await set('shopifyData', shopify);

    await redisClient.set('rewardifyToken', rewardifyTokenData, 'ex', 3600);
    console.log('token');
  } catch (error) {
    console.log(error);
  }
});
getToken.start();
module.exports = { getToken };
