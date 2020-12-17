const redisClient = require('../db/redis')
const { authJwt } = require('../middleware')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })
  // Pull all users
  app.get('/api/dashboard', authJwt.verifyToken, async (req, res, next) => {
    try {
      const cacheData = await redisClient.get('users')

      const usersApi = JSON.parse(cacheData)
      return res.json(usersApi)
    } catch (error) {
      return res.status(500).json({
        err: {
          msg: 'Could not establish a connection'
        }
      })
    }
  })
}
