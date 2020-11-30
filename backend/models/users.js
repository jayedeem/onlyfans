const mongoose = require('mongoose');
const { Schema } = mongoose;
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      min: 11,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    role: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
