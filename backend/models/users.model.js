const mongoose = require('mongoose')
const { Schema } = mongoose
const usersSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2
    },
    lastname: {
      type: String,
      required: true,
      min: 2
    },
    username: {
      type: String,
      required: true,
      min: 2
    },
    email: {
      type: String,
      required: true,
      min: 5
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
      }
    ]
  },
  { timestamps: true }
)

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
