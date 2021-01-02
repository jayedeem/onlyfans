const axios = require('axios')
const Shopify = require('shopify-api-node')
const redisClient = require('../db/redis')
const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
  GraphQLObjectType,

  GraphQLString,

  GraphQLList,
  GraphQLSchema
} = require('graphql')

// User Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    state: { type: GraphQLString },
    tags: { type: GraphQLString }
  })
})

const RewardifyCustomerType = new GraphQLObjectType({
  name: 'RewardifyCustomer',
  fields: () => ({
    amount: { type: GraphQLString }
  })
})

const AuthDataType = new GraphQLObjectType({
  name: 'AuthData',
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    userId: { type: GraphQLString }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    allUsers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args, req) {
        if (!req.isAuth) {
          throw new Error('Not auth')
        }
        return (async () => {
          const shopify = new Shopify({
            shopName: 'ultra-swag.myshopify.com',
            apiKey: process.env.SHOPIFY_KEY,
            password: process.env.SHOPIFY_PASSWORD,
            autoLimit: false
          })
          let params = { limit: 250 }
          let results = []

          do {
            const customers = await shopify.customer.list(params)
            results.push(customers)
            console.log(customers.length)
            params = customers.nextPageParameters
          } while (params !== undefined)
          const userApi = results.flat(1)

          return userApi
        })().catch((err) => console.log(err))
      }
    },
    rewardify: {
      type: RewardifyCustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args, req) {
        if (!req.isAuth) {
          throw new Error('Not auth')
        }
        return redisClient
          .get('cacheToken')
          .then((res) => JSON.parse(res))
          .then(({ access_token }) =>
            axios
              .get(`${process.env.REWARDIFY_URL}/customer/${args.id}/account`, {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${access_token}`
                }
              })
              .then((res) => res.data)
          )
      }
    },
    me: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parents, args, req) {
        if (!req.isAuth) {
          throw new Error('Not auth')
        }
        return axios
          .get(
            `https://ultra-swag.myshopify.com/admin/api/2020-10/customers/${args.id}.json`,
            {
              headers: {
                'Content-type': 'application/json',
                authorization: 'Basic ' + process.env.SHOPIFY_X_TOKEN
              }
            }
          )
          .then((res) => res.data.customer)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    login: {
      type: AuthDataType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, { username, password }) => {
        const user = await User.findOne({ username })
        if (!user) {
          throw new Error('Invalid Credentials')
        }
        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
          throw new Error('Invalid Credentials')
        }

        const token = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 86400 // 24 hours
          }
        )
        return {
          userId: user.id,
          token,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
