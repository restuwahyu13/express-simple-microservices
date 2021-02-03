const express = require('express')
const router = express.Router()
const { controller } = require('../controllers/controller.product')

router.post('/product', controller.createProduct)
router.get('/product', controller.resultsProduct)
router.get('/product/:id', controller.resultProduct)
router.delete('/product/:id', controller.deleteProduct)
router.put('/product/:id', controller.updateProduct)

module.exports = router
