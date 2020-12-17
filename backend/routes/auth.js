const { verifySignUp, authJwt } = require('../middleware')
const controller = require('../controllers/authController')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/auth/signup',
    // [authJwt.verifyToken, authJwt.isAdmin],
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  )

  app.post('/api/auth/signin', controller.signin)
}
