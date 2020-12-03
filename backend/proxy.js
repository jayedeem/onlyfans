const express = require('express')
const cors_proxy = require('cors-anywhere')
const morgan = require('morgan')

const app = express()

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.POST || 2337

cors_proxy
  .createServer({
    origin: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
  })
  .listen(PORT, HOST, () => console.log(`CORS Running on ${HOST}:${PORT}`))
