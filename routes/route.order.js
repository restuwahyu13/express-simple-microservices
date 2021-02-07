const express = require('express')
const router = express.Router()
const { controller } = require('../controllers/controller.order')

router.post('/order', controller.createOrder)
router.get('/order', controller.resultsOrder)
router.get('/order/:id', controller.resultsOrder)
router.delete('/order/:id', controller.deleteOrder)
router.put('/order/:id', controller.deleteOrder)

module.exports = router
