const { authJwt, cachedUsers } = require('../middleware')
const controller = require('../controllers/shopifyController')
const cors = require('./cors')

module.exports = function (app) {
  app.use(cors.cors, (req, res, next) => {
    next()
  })

  app.get(
    '/api/shopify/users',
    cors.corsWithOptions,
    authJwt.verifyToken,
    cachedUsers,
    controller.retrieveUsers
  )
  app.post(
    '/api/shopify/userCreation',
    cors.corsWithOptions,
    authJwt.verifyToken,
    controller.createUser
  )
  app.get(
    '/api/shopify/reset',
    cors.corsWithOptions,
    authJwt.verifyToken,
    controller.resetUsers
  )
}
