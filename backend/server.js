const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('ioredis')
const morgan = require('morgan')
const RedisStore = require('connect-redis')(session)
const { authJwt } = require('./middleware')
// Middleware
const dotenv = require('dotenv')
const cors = require('cors')
// const verify = require('./middleware/verifyToken')
// const cookieParser = require('cookie-parser')
const { cachedToken } = require('./middleware/')
// // const cachedUsers = require('./middleware/cachedUsers')
// const inSession = require('./middleware/inSession')
// // Routes
// const dashboardRoute = require('./routes/dashboard')
// const rewardifyRoute = require('./routes/rewardifyRoutes')
// const authRoute = require('./routes/auth')
// const test = require('./routes/test')
// const shopRoute = require('./routes/shopRoutes')
const db = require('./models/')
dotenv.config()
morgan('dev')

const { PORT, SESSION_SECRET, NODE_ENV } = process.env
const redisClient = redis.createClient()

const port = PORT || 1337
const Role = db.role

db.mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log('connected to db')
      initial()
    } catch (error) {
      console.log(error)
    }
  }
)

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'user' to roles collection")
      })

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })

      new Role({
        name: 'overlord'
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'overlord' to roles collection")
      })
    }
  })
}
const app = express()
// app.use(cors)
app.use(express.json())

// app.get('/test/api', test)
require('./routes/auth')(app)
app.use(cachedToken)
require('./routes/user')(app)
require('./routes/shopify')(app)
require('./routes/dashboard')(app)
require('./routes/rewardify')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
