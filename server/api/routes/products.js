const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET request to products'
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'POST request to products'
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if(id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID!',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'GETTING the specified product ID'
    })
  }

})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
    res.status(200).json({
      message: 'Update Product',
      id: id
    })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
    res.status(200).json({
      message: 'Deleted Product',
      id: id
    })
})

module.exports = router;