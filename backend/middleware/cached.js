const axios = require('axios');
const redisClient = require('../db/redis');

let cacheTime;
let cacheData;

module.exports = async function (req, res, next) {
  if (cacheTime && cacheTime > Date.now() - 60 * 10000 * 59) {
    const getCached = await redisClient.get('cacheData', (err, result) => {
      if (result) {
        return res.send({ api: JSON.parse(result) });
      } else {
        console.log(err);
      }
    });
    console.log(getCached);
    return res.send(getCached);
  }
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

    cacheData = {
      rewardifyTokenData,
      shopify,
    };
    cacheTime = Date.now();
    cacheData.cacheTime = cacheTime;
    const someData = JSON.stringify(cacheData);

    await redisClient.set('cacheData', someData, 'ex', 3600);

    const getCached = await redisClient.get('cacheData');

    return res.send({ data: JSON.parse(getCached) });
  } catch (error) {
    console.log(error);
  }
  next();
};
