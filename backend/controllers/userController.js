exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

const Shopify = require('shopify-api-node')

exports.orders = async (req, res) => {
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
    res.send(userApi)
  })().catch(console.error)
}
