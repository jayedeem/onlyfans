const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/auth/login', { target: 'http://localhost:1337' }))
  app.use(proxy('/api/dashboard', { target: 'http://localhost:1337' }))
  app.use(
    proxy('/api/rewardify/users/:id', { target: 'http://localhost:1337' })
  )
}
