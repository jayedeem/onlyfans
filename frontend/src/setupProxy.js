const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/auth/login', { target: 'http://localhost:1337' }))
  app.use(
    proxy('/api/rewardify/addCredit', { target: 'http://localhost:1337' })
  )
  app.use(
    proxy('/api/rewardify/removeCredit', { target: 'http://localhost:1337' })
  )
  app.use(
    proxy('/api/rewardify/zeroCredit', { target: 'http://localhost:1337' })
  )
}
