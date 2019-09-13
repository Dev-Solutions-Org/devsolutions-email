const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { handleContact } = require('./controllers/contact')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => {
  handleContact(req, res)
})

app.listen(3000)
