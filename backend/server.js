const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('ioredis')
const morgan = require('morgan')
const RedisStore = require('connect-redis')(session)

// Middleware
const dotenv = require('dotenv')
const cors = require('cors')
const verify = require('./middleware/verifyToken')
const cookieParser = require('cookie-parser')
const cached = require('./middleware/cached')
const cachedUsers = require('./middleware/cachedUsers')
const inSession = require('./middleware/inSession')
// Routes
const dashboardRoute = require('./routes/dashboard')
const rewardifyRoute = require('./routes/rewardifyRoutes')
const authRoute = require('./routes/auth')
const shopRoute = require('./routes/shopRoutes')

dotenv.config()
morgan('dev')

const { PORT, SESSION_SECRET, NODE_ENV } = process.env
const redisClient = redis.createClient()

const port = PORT || 1337

mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log('connected to db')
    } catch (error) {
      console.log(error)
    }
  }
)

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
)
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use('/auth', authRoute)

// Verify then check cache time
// app.use(inSession)

app.use(cached)
app.use(cachedUsers)

// app.use('/test/shop/', shopTest)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/rewardify', rewardifyRoute)
app.use('/api/shopify', shopRoute)

app.listen(port, () => console.log(`Listening on port ${port}`))
