const mongoose = require("mongoose");
const moment = require('moment');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 10
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(created_at) {
      return moment(created_at).format('YYYY-MM-DD HH:mm:ss');
    },
  messages: {
    type: Array,
  }
  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
