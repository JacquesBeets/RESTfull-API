const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Route Imports
const ProductRoutes = require('./api/routes/products')
const OrderRoutes = require('./api/routes/orders')
const UserRoutes = require('./api/routes/user')

//Connect to MongoDB
mongoose.connect('mongodb+srv://node-online-shop:'+ process.env.MONGO_PASS + '@nodejs-online-shop-restapi-u0rmt.mongodb.net' + '/test?retryWrites=true', {autoIndex: false}
)

//Middleware
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Cors Error Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

//Routes
app.use('/products', ProductRoutes)
app.use('/orders', OrderRoutes)
app.use('/user', UserRoutes)

app.use((req, res, next) => {
  const error = new Error('Request Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app