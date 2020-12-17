const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/auth/login', { target: 'http://localhost:1337' }))
}
