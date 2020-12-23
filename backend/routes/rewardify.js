const { authJwt } = require('../middleware')
const controller = require('../controllers/rewardifyController')
const { cachedUsers } = require('../middleware')
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/api/rewardify/user/:id',
    authJwt.verifyToken,
    controller.retrieveUser
  )
  app.put('/api/rewardify/addCredit', authJwt.verifyToken, controller.addCredit)
  app.put(
    '/api/rewardify/subtractCredit',
    authJwt.verifyToken,
    controller.subtractCredit
  )
  app.put(
    '/api/rewardify/replaceCredit',
    authJwt.verifyToken,
    controller.replaceCredit
  )
}
