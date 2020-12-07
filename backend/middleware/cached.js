const axios = require('axios')
const redisClient = require('../db/redis')

let cacheTime

let cacheToken

// Cache Token
module.exports = async (req, res, next) => {
  const dataToParse = await redisClient.get('cacheToken')
  const api = await JSON.parse(dataToParse)
  if (api && cacheTime && api.cacheTime > Date.now() - 30 * 10000 * 59) {
    console.log('using old token')
    return next()
  }
  try {
    const rewardifyToken = await axios.request({
      method: 'POST',
      url: `https://api.rewardify.ca/oauth/v2/token`,
      headers: {
        'Content-type': 'application/json'
      },
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      },
      data: {
        grant_type: 'client_credentials'
      }
    })
    const { access_token } = rewardifyToken.data

    cacheToken = {
      access_token
    }
    cacheTime = Date.now()
    cacheToken.cacheTime = cacheTime
    console.log(cacheToken)
    const someData = JSON.stringify(cacheToken)
    await redisClient.set('cacheToken', someData, 'ex', 3600)
    return next()
  } catch (error) {
    console.log(error)
  }
}
