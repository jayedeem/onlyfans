const axios = require('axios');
const redisClient = require('./db/redis');

let cacheTime;
let cacheData;

const getToken = async (req, res, next) => {
  if (cacheTime && cacheTime > Date.now() - 60 * 10000 * 59) {
    const getData = redisClient.get('cacheData');
    return res.json(getData);
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

    const set = (key, value) => {
      redisClient.set(key, JSON.stringify(value), 'ex', 3600);
    };

    const shopData = await set('shopifyData', shopify);

    cacheData = {
      rewardifyTokenData,
      shopData,
    };
    cacheTime = Date.now();
    cacheData.cacheTime = cacheTime;

    console.log(cacheData);

    const cached = await redisClient.set('cacheData', cacheData, 'ex', 3600);
    // await redisClient.set('rewardifyToken', rewardifyTokenData, 'ex', 3600);
    return res.json(cached)
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = { getToken };
