const Users = require('../models/users')
const bcrypt = require('bcryptjs')

const {
  registerValidation,
  loginValidation
} = require('../validation/validation')

exports.registerAuth = async (req, res, next) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  // Check if user exists

  try {
    console.log(req.session)
    const { role, userId, isLoggedIn } = req.session
    console.log('role', role)
    if (role !== 'admin') {
      res.status(403).json({
        error: {
          msg: 'You are not authorized'
        }
      })
    } else {
      const emailExist = await Users.findOne({
        email: req.body.email
      })

      if (emailExist)
        return res.status(400).send({
          message: 'Email Already Exists'
        })

      // Hash pw

      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      // Create user
      const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      await user.save()
      res.status(201).send({ user: { msg: 'User Created' } })
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.loginAuth = async (req, res, next) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  // Check if email exists
  try {
    const user = await Users.findOne({
      email: req.body.email
    })

    if (!user)
      return res.status(400).json({
        error: {
          msg: 'Email or Password is incorrect'
        }
      })

    // Check password is valid

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword)
      return res.status(400).json({
        error: {
          msg: 'Email or Password is incorrect'
        }
      })

    req.session.userId = user._id
    req.session.isLoggedIn = true
    req.session.role = user.role
    req.session.name = user.name
    res.status(200).send('Logged in')
    next()
  } catch (error) {
    console.log(error)
  }
}
