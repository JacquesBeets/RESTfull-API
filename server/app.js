const express = require('express')
const app = express()
const morgan = require('morgan')

const ProductRoutes = require('./api/routes/products')
const OrderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))

app.use('/products', ProductRoutes)
app.use('/orders', OrderRoutes)

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