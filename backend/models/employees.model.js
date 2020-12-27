const mongoose = require('mongoose')

const Employees = mongoose.model(
  'Employees',
  new mongoose.Schema({
    name: String,
    amount: Number,
    shopifyId: Number
  })
)

module.exports = Employees
