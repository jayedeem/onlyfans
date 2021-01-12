const { authJwt } = require('../middleware')
const controller = require('../controllers/userController')
const test = require('../routes/test')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/test/all', controller.allAccess)

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard)

  app.get('/api/test/orders', controller.orders)

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.moderatorBoard
  )

  app.get(
    '/api/test/overlord',
    [authJwt.verifyToken, authJwt.isOverlord],
    controller.adminBoard
  )
}
