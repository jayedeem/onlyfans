const axios = require('axios')
const redisClient = require('../db/redis')
const cors = require('../routes/cors')
// const cacheData = redisClient.get('cacheData')
// const { shopify } = JSON.parse(cacheData)

exports.retrieveUser = async (req, res, next) => {
  try {
    const cacheData = await redisClient.get('cacheToken')
    const { access_token } = await JSON.parse(cacheData)
    const { id } = req.params
    console.log(id)
    const { data } = await axios.get(
      `${process.env.REWARDIFY_URL}/customer/${id}/account`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${access_token}`
        }
      }
    )
    // Data from rewardify comes as an Object
    console.log(data)
    if (!data) {
      return res.status(404).send('No user found')
    }
    // const user = Object.entries(data)
    // console.log('user', user)
    return res.status(200).json({
      api: data,
      status: {
        msg: `Please wait...Retrieving ${data.customer.firstName} ${data.customer.lastName}`
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send('No user found')
  }
}
// Give customer credit
exports.addCredit = async (req, res, next) => {
  const { email, amount, memo, expiresAt, userId } = req.body
  console.log(
    'add credit initializing ',
    email,
    amount,
    memo,
    expiresAt,
    userId
  )
  // return res.send('hello')
  try {
    console.log('addcredit backend start')
    const cacheData = await redisClient.get('cacheToken')
    const { access_token } = await JSON.parse(cacheData)
    await axios.request({
      url: `/customer/${userId}/account/credit`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${access_token}`
      },
      data: {
        userId,
        email,
        amount,
        memo,
        expiresAt
      }
    })
    console.log('addcredit backend completed')
    return res.status(200).json({
      status: {
        msg: 'Credit Completed'
      }
    })
  } catch (error) {
    console.error(error)
  }
}

// Replaces Credit with new amount
exports.subtractCredit = async (req, res, next) => {
  const { email, amount, memo, userId } = req.body
  try {
    const cacheData = await redisClient.get('cacheToken')
    const { access_token } = await JSON.parse(cacheData)
    // Debit
    await axios.request({
      url: `/customer/${userId}/account/debit`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${access_token}`
      },
      data: {
        userId,
        email,
        amount,
        memo
      }
    })
    return res.status(200).json({
      status: {
        msg: 'Removed Complete'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

//Replaces Credit with new amount

exports.replaceCredit = async (req, res, next) => {
  const { email, amount, memo, expiresAt, userId } = req.body
  try {
    const cacheData = await redisClient.get('cacheToken')
    const { access_token } = await JSON.parse(cacheData)
    await axios.request({
      url: `/customer/${userId}/account/reset`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${access_token}`
      },
      data: {
        userId,
        email,
        amount,
        memo,
        expiresAt
      }
    })
    return res.status(200).json({
      status: {
        msg: 'Reset Complete'
      }
    })
  } catch (error) {
    console.log(error)
  }
}
