const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const axios = require('axios')
require('dotenv').config()
const { createUser, disableUser } = require('../controllers/shopifyController')
const { authJwt } = require('../middleware')
router.post('/createuser', authJwt.verifyToken, authJwt.isAdmin, createUser)
router.delete('/disable', disableUser)

module.exports = router
