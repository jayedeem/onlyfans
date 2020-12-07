const express = require('express')
const axios = require('axios')
const router = express.Router()
const redisClient = require('../db/redis')

router.get('/', async (req, res) => {
  // Send data to frontend

  try {
    const cacheData = await redisClient.get('users')
    // res.json(cacheData)
    const usersApi = JSON.parse(cacheData)
    return res.json(usersApi)
  } catch (error) {
    return res.status(500).json({
      err: {
        msg: 'Something went wrong'
      }
    })
  }
})

module.exports = router
