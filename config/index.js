
require('dotenv').config()

const config = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}

module.exports = { config }
