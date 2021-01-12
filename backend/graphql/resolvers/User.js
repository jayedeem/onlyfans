const redisClient = require('../../db/redis')
const axios = require('axios')
const db = require('../../models')
const User = db.user
const { UserInputError, ForbiddenError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
  validateLoginInput,
  validateAddCredits
} = require('../utils/validators')
module.exports = {
  Mutation: {
    async rewardsInfo(parent, { userId }) {
      try {
        return redisClient
          .get('cacheToken')
          .then((res) => JSON.parse(res))
          .then(({ access_token }) =>
            axios.get(`https://api.rewardify.ca/customer/${userId}/account`, {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${access_token}`
              }
            })
          )
          .then((res) => res.data)
      } catch (error) {
        throw new Error(error)
      }
    },
    async me(parent, { userId }) {
      try {
        return axios
          .get(
            `https://ultra-swag.myshopify.com/admin/api/2020-10/customers/${userId}.json`,
            {
              headers: {
                'Content-type': 'application/json',
                authorization: 'Basic ' + process.env.SHOPIFY_X_TOKEN
              }
            }
          )
          .then((res) => res.data.customer)
      } catch (error) {
        throw new Error(error)
      }
    },
    async login(parent, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        throw new UserInputError('Invalid Credentials', {
          errors: {
            username: 'Invalid Credentials'
          }
        })
      }
      const isEqual = await bcrypt.compare(password, user.password)

      if (!isEqual) {
        throw new UserInputError('Password does not match', {
          errors: {
            password: 'Password does not match'
          }
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
      })
      return {
        userId: user.id,
        token,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username
      }
    },
    async addCredits(_, { userId, amount }) {
      const { valid, errors } = validateAddCredits(userId, amount)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      try {
        const cacheData = await redisClient.get('cacheToken')
        const { access_token } = await JSON.parse(cacheData)
        if (!userId) {
          throw new UserInputError('ID must not be empty', {
            errors: {
              userId: 'ID must not be empty'
            }
          })
        }
        if (!amount) {
          throw new UserInputError('amount must not be empty', {
            errors: {
              amount: 'amount must not be empty'
            }
          })
        }

        const res = await axios.request({
          url: `/customer/${userId}/account/credit`,
          method: 'PUT',
          baseURL: 'https://api.rewardify.ca/',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${access_token}`
          },
          data: {
            userId,
            email: '',
            amount,
            memo: '',
            expiresAt: '2021-05-05T10:21:05.349Z'
          }
        })
        if (!res) {
          throw new ForbiddenError('Something went wrong', {
            errors: {
              general: 'Something went wrong'
            }
          })
        }
        return 'SUCCESS'
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
