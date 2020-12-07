const shopify = require('../shopify/shop')
const axios = require('axios')
const redisClient = require('../db/redis')

module.exports = async (req, res, next) => {
  // const dataToParse = await redisClient.get('cacheData')
  // const api = await JSON.parse(dataToParse)
  // if (api && cacheTime && api.cacheTime > Date.now() - 30 * 10000 * 59) {
  //   console.log('using old data')
  //   return next()
  // }
  let results = []

  ;(async () => {
    let params = { limit: 250 }

    do {
      const customer = await shopify.customer.list(params)

      results.push(customer)

      params = customer.nextPageParameters
    } while (params !== undefined)

    const data = results.flat(1).filter((user) => user.tags === 'employee')
    let cacheTime

    let cacheData
    cacheData = {
      data
    }
    console.log('Cachedata', cacheData)
    const someData = JSON.stringify(data)
    await redisClient.set('cacheData', someData, 'ex', 3600)
    const dataToParse = await redisClient.get('cacheData')
    const api = await JSON.parse(dataToParse)
    return res.json(api)
  })().catch((err) => console.log(err))
}
