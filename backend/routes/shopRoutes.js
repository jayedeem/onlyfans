const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const axios = require('axios')
require('dotenv').config()
const { createUser, reports } = require('../controllers/shopifyController')

router.post('/createuser', createUser)
router.get('/reports', reports)

module.exports = router
