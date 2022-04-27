const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
require('dotenv').config()
const port = process.env.PORT || 5000

// app
const app = express()

// middleware
app.use(cors())

// home router
app.get('/', (req, res) => {
  res.send('Ema-john is running')
})

// app running
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
