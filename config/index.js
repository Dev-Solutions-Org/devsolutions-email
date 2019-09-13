
require('dotenv').config()

const config = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  email2: process.env.EMAIL2
}

module.exports = { config }
