const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
Product.find()
  .exec()
  .then(docs => {
    console.log(docs)
    if(docs.length > 0) {
      res.status(200).json(docs)
    } else {
      res.status(200).json({
        message: 'We have no products to show. Please add some products first.'
      })
    }

  })
  .catch( err => {
    console.log(err)
    res.status(500).json({error: err})
  })
})

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product
    .save()
    .then(result => {
     console.log(result)
      res.status(201).json({
        message: 'New Product Created!',
        createdProduct: result
      })
    })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log('From our database:', doc)
    if (doc) {
      res.status(200).json({doc})
    } else {
      res.status(404).json({message: 'No valid entry found for this product'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  const updateOperation = {}
  for(const ops of req.body) {
    updateOperation[ops.propName] = ops.value
  }
  Product.update({_id: id}, {$set: updateOperation})
  .exec()
  .then(result => {
    console.log(result)
    res.status(200).json({message: 'Product has been updated succesfully.', result})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findOneAndRemove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({message: `${result.name} has been removed succesfully.`})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err}, result)
  })
})

module.exports = router;