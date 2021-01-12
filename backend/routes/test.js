const Shopify = require('shopify-api-node')

module.exports = async (req, res, next) => {
  ;(async () => {
    const shopify = new Shopify({
      shopName: 'ultra-swag.myshopify.com',
      apiKey: process.env.SHOPIFY_KEY,
      password: process.env.SHOPIFY_PASSWORD,
      autoLimit: true
    })
    let params = { limit: 250 }
    let results = []

    do {
      const orders = await shopify.order.list(params)
      results.push(orders)
      console.log(orders.length)
      params = orders.nextPageParameters
    } while (params !== undefined)
    const userApi = results.flat(1)
    console.log(userApi)
  })().catch(console.error)
}
