const CronJob = require('cron').CronJob;
const axios = require('axios');
const client = require('./db/redis');

const getToken = new CronJob('1 * * * * *', async () => {
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
  const data = rewardifyToken.data.access_token;
  console.log('token set');
  await client.set('rewardifyToken', data);
});
getToken.start();
module.exports = getToken;
