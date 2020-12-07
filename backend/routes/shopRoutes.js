const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const axios = require('axios')
require('dotenv').config()
const { createUser } = require('../controllers/shopifyController')

router.post('/createuser', createUser)

module.exports = router
