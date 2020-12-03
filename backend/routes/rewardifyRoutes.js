const express = require('express')
const router = express.Router()

const rewardifyController = require('../controllers/rewardifyController')

// Get User Details from Rewardify based on params
router.get('/users', rewardifyController.retrieveUsers)
router.get('/user/:id', rewardifyController.retrieveUser)

// Credit Endpoints
router.post('/addcredit', rewardifyController.addCredit)

// Replaces Credit with new amount
router.post('/replacecredit', rewardifyController.replaceCredit)

// Subtracts from amount
router.post('/subtractcredit', rewardifyController.subtractCredit)

module.exports = router
