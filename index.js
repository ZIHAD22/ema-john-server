const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
require('dotenv').config()
const port = process.env.PORT || 5000

// app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// dataBase
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eyeab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
const dataBaseConnect = async () => {
  try {
    await client.connect()
    const productCollection = client.db('emaJohn').collection('product')

    app.get('/product', async (req, res) => {
      const { page, size } = req.query
      const query = {}
      const curser = productCollection.find(query)
      let product
      if (page || size) {
        product = await curser
          .skip(parseInt(page) * parseInt(size))
          .limit(parseInt(size))
          .toArray()
      } else {
        product = await curser.toArray()
      }

      res.send(product)
    })

    app.get('/productCount', async (req, res) => {
      const count = await productCollection.estimatedDocumentCount()

      res.send({ count })
    })
  } finally {
    console.log('dataBase is connected')
  }
}

dataBaseConnect().catch(console.dir)

// home router
app.get('/', (req, res) => {
  res.send('Ema-john is running')
})

// app running
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
