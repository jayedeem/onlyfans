const { authJwt, cachedUsers } = require('../middleware')
const controller = require('../controllers/shopifyController')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/shopify/users',
    // authJwt.verifyToken,
    cachedUsers,
    controller.retrieveUsers
  )
  app.post(
    '/api/shopify/userCreation',
    authJwt.verifyToken,
    controller.createUser
  )
}
