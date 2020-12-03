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
const cached = require('./middleware/cached')
const cookieParser = require('cookie-parser')
const inSession = require('./middleware/inSession')
// Routes
const dashboardRoute = require('./routes/dashboard')
const rewardifyRoute = require('./routes/rewardifyRoutes')
const authRoute = require('./routes/auth')

dotenv.config()
morgan('tiny')

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
app.use(cors())

// app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: 'sess',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.use('/auth', authRoute)

// Verify then check cache time
app.use(inSession)

app.use(cached)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/rewardify', rewardifyRoute)

app.listen(port, () => console.log(`Listening on port ${port}`))
