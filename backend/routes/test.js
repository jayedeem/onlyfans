const test = require('../controllers/test')
const express = require('express')

const router = express.Router()

router.get('/cust', test.getCustomers)

module.exports = router
