const Shopify = require('shopify-api-node')

module.exports = {
  Query: {
    async getCustomers() {
      try {
        return (async () => {
          const shopify = new Shopify({
            shopName: 'ultra-swag.myshopify.com',
            apiKey: process.env.SHOPIFY_KEY,
            password: process.env.SHOPIFY_PASSWORD,
            autoLimit: false
          })
          let params = { limit: 250 }
          let results = []

          do {
            const customers = await shopify.customer.list(params)
            results.push(customers)
            console.log(customers.length)
            params = customers.nextPageParameters
          } while (params !== undefined)
          const userApi = results.flat(1)

          return userApi
        })()
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
