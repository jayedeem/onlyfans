const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('ioredis')
const morgan = require('morgan')
const { graphqlHTTP } = require('express-graphql')
// Middleware
const { authJwt } = require('./middleware/')
const dotenv = require('dotenv')
const cors = require('cors')
const schema = require('./schemas/userSchema')
const db = require('./models/')
const cached = require('./middleware/cached')
dotenv.config()
morgan('dev')

const { PORT, SESSION_SECRET, NODE_ENV } = process.env

const port = PORT || 1337
const Role = db.role

db.mongoose.connect(
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

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: 'user'
//       }).save((err) => {
//         if (err) {
//           console.log('error', err)
//         }

//         console.log("added 'user' to roles collection")
//       })

//       new Role({
//         name: 'admin'
//       }).save((err) => {
//         if (err) {
//           console.log('error', err)
//         }

//         console.log("added 'admin' to roles collection")
//       })

//       new Role({
//         name: 'overlord'
//       }).save((err) => {
//         if (err) {
//           console.log('error', err)
//         }

//         console.log("added 'overlord' to roles collection")
//       })
//     }
//   })
// }
const app = express()
app.use(express.json())
app.use(authJwt.verifyToken)
app.use(cached)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

// app.get('/test/api', test)
// require('./routes/auth')(app)
// require('./routes/user')(app)
// require('./routes/shopify')(app)
// require('./routes/dashboard')(app)
// require('./routes/rewardify')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
