const jwt = require('jsonwebtoken')

const db = require('../models')
const User = db.user
const Role = db.role

verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    req.isAdmin = false
    return next()
  }
  ;(req.isAuth = true), (req.userId = decodedToken.userID)
  return next()
}

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'admin') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Admin Role!' })
        return
      }
    )
  })
}

isOverlord = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'overlord') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Moderator Role!' })
        return
      }
    )
  })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isOverlord
}
module.exports = authJwt
