const express = require('express')
const router = express.Router()
const productsService = require ('./../services/products')

router.get('/', (req, res) => {
    productsService.getAllProducts()
        .then(function (data) {
            res.render('products/index', {
                products: data
            })
        })
})

router.get('/products/:id/json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    productsService.getProductById(req.params.id)
        .then((product) => {
            if (!product) {
                next()
            }
            
            return res.send({
                id: product.sku,
                price: product.price
            })
        })
        .catch((e) => {
            return res.send(e);
        });
})

router.get('/products/:id', (req, res) => {
    productsService.getProductById(req.params.id)
        .then((product) => {
            return res.render('products/details', {
                product: product
            })
        })
})

module.exports = router