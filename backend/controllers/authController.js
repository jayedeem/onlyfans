const db = require('../models')
const User = db.user
const Role = db.role

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          user.roles = roles.map((role) => role._id)
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }

            res.send({ message: 'User was registered successfully!' })
          })
        }
      )
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        user.roles = [role._id]
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'User was registered successfully!' })
        })
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
      })

      const authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        isAuth: true
      })
    })
}

// const Users = require('../models/users.model')
// const bcrypt = require('bcryptjs')

// const {
//   registerValidation,
//   loginValidation
// } = require('../validation/validation')

// exports.registerAuth = async (req, res, next) => {
//   const { error } = registerValidation(req.body)
//   if (error) return res.status(400).send(error.details[0].message)
//   // Check if user exists

//   try {
//     console.log(req.session)
//     const { role, userId, isLoggedIn } = req.session
//     console.log('role', role)
//     if (role !== 'admin') {
//       res.status(403).json({
//         error: {
//           msg: 'You are not authorized'
//         }
//       })
//     } else {
//       const emailExist = await Users.findOne({
//         email: req.body.email
//       })

//       if (emailExist)
//         return res.status(400).send({
//           message: 'Email Already Exists'
//         })

//       // Hash pw

//       const salt = await bcrypt.genSalt(12)
//       const hashedPassword = await bcrypt.hash(req.body.password, salt)

//       // Create user
//       const user = new Users({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       })
//       await user.save()
//       res.status(201).send({ user: { msg: 'User Created' } })
//     }
//   } catch (error) {
//     res.status(400).send(error)
//   }
// }

// exports.loginAuth = async (req, res, next) => {
//   const { error } = loginValidation(req.body)
//   if (error) return res.status(400).send(error.details[0].message)
//   // Check if email exists
//   try {
//     const user = await Users.findOne({
//       email: req.body.email
//     })

//     if (!user)
//       return res.status(400).json({
//         error: {
//           msg: 'Email or Password is incorrect'
//         }
//       })

//     // Check password is valid

//     const validPassword = await bcrypt.compare(req.body.password, user.password)

//     if (!validPassword)
//       return res.status(400).json({
//         error: {
//           msg: 'Email or Password is incorrect'
//         }
//       })

//     req.session.userId = user._id
//     req.session.isLoggedIn = true
//     req.session.role = user.role
//     req.session.name = user.name
//     return res.status(200).send({
//       status: {
//         isLoggedIn: true,
//         role: user.role,
//         name: user.name
//       }
//     })

//     next()
//   } catch (error) {
//     console.log(error)
//   }
// }

// exports.logout = (req, res, next) => {
//   req.session.destroy()
//   return res.status(200).json({
//     status: {
//       isLoggedIn: false
//     }
//   })
// }
