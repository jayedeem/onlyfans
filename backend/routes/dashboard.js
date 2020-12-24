const redisClient = require('../db/redis')
const { authJwt } = require('../middleware')
const cors = require('./cors')

module.exports = function (app) {
  app.use(cors.cors, (req, res, next) => {
    next()
  })
  // Pull all users
  app.get(
    '/api/dashboard',
    cors.cors,
    authJwt.verifyToken,
    async (req, res, next) => {
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
    }
  )
}
