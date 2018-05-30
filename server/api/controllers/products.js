const Product = require('../models/product')

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return{
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      }
      if(docs.length > 0) {
        res.status(200).json(response)
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
  }

  exports.create_product = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    })
    product
      .save()
      .then(result => {
       console.log(result)
        res.status(201).json({
          message: 'New Product Created!',
          createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            productImage: result.productImage,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + result._id
            }
          }
        })
      })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
  }

  exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/'
          }
  
        })
      } else {
        res.status(404).json({message: 'No valid entry found for this product'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
  }

  exports.update_product = (req, res, next) => {
    const id = req.params.productId
    const updateOperation = {}
    for(const ops of req.body) {
      updateOperation[ops.propName] = ops.value
    }
    Product.update({_id: id}, {$set: updateOperation})
    .exec()
    .then(result => {
      console.log('Product has been updated succesfully: ', result)
      res.status(200).json({
        message: 'Product has been updated succesfully.', 
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
  }

  exports.delete_product = (req, res, next) => {
    const id = req.params.productId
    Product.findOneAndRemove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({message: `${result.name} has been removed successfully.`})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err}, result)
    })
  }