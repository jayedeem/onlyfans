const Shopify = require('shopify-api-node')

const redisClient = require('../db/redis')

module.exports = async (req, res, next) => {
  const dataToParse = await redisClient.get('users')
  const api = await JSON.parse(dataToParse)

  if (api && api.cacheTime > Date.now() - 30 * 10000 * 59) {
    console.log('old users data')
    return next()
  }
  ;(async () => {
    const shopify = new Shopify({
      shopName: 'ultra-swag.myshopify.com',
      apiKey: process.env.SHOPIFY_KEY,
      password: process.env.SHOPIFY_PASSWORD,
      autoLimit: true
    })
    let params = { limit: 250 }
    let results = []
    let cacheTime
    let cacheData

    do {
      const customers = await shopify.customer.list(params)
      results.push(customers)
      params = customers.nextPageParameters
    } while (params !== undefined)
    const userApi = results.flat(1).filter((user) => user.tags === 'employee')
    cacheData = {
      userApi
    }
    cacheTime = Date.now()
    cacheData.cacheTime = cacheTime
    const userData = JSON.stringify(cacheData)

    await redisClient.set('users', userData, 'ex', 3600)

    return next()
  })().catch(console.error)
}
