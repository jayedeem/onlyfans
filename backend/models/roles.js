const mongoose = require('mongoose');
const { Schema } = mongoose;
const rolesSchema = new Schema(
  {
    overlord: {
      type: String,
      required: false,
    },
    admin: {
      type: String,
      required: false,
    },
    peon: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Roles = mongoose.model('Roles', rolesSchema);
module.exports = Roles;
