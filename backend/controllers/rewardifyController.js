const express = require('express')
const router = express.Router()
const axios = require('axios')
const redisClient = require('../db/redis')

// const cacheData = redisClient.get('cacheData')
// const { shopify } = JSON.parse(cacheData)

exports.retrieveUsers = async (req, res, next) => {
  const { role, isLoggedIn, userID } = req.session
  try {
    const cacheData = await redisClient.get('cacheData')
    const { shopify } = await JSON.parse(cacheData)
    return res.json({ api: shopify })
  } catch (error) {
    return res.status(500).json({
      err: {
        msg: 'Something went wrong'
      }
    })
  }
}

exports.retrieveUser = async (req, res, next) => {
  try {
    const cacheData = await redisClient.get('cacheToken')
    const { access_token } = await JSON.parse(cacheData)
    const { id } = req.params
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
    if (!data) {
      return res.status(404).send('No user found')
    }
    // const user = Object.entries(data); Need to parse Object to array? Front or backend?
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}
// Give customer credit
exports.addCredit = async (req, res, next) => {
  const { email, amount, memo, expiresAt, userId } = req.body
  try {
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
    return res.status(200).json({
      status: {
        msg: 'Credit Completed'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// Replaces Credit with new amount
exports.subtractCredit = async (req, res, next) => {
  const { email, amount, memo, userId } = req.body
  try {
    const cacheData = await redisClient.get('cacheData')
    const { rewardifyTokenData } = await JSON.parse(cacheData)
    // Debit
    await axios.request({
      url: `/customer/${userId}/account/debit`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${rewardifyTokenData}`
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
    const cacheData = await redisClient.get('cacheData')
    const { rewardifyTokenData } = await JSON.parse(cacheData)
    await axios.request({
      url: `/customer/${userId}/account/reset`,
      method: 'PUT',
      baseURL: 'https://api.rewardify.ca/',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${rewardifyTokenData}`
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
