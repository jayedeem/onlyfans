const Shopify = require('shopify-api-node')

const shopify = new Shopify({
  shopName: 'ultra-swag.myshopify.com',
  apiKey: process.env.SHOPIFY_KEY,
  password: process.env.SHOPIFY_PASSWORD
  // autoLimit: true
})

module.exports = shopify
