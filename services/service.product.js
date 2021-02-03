const cote = require('cote')
const products = require('../models/model.product')

const ProductRequester = new cote.Requester({
	name: 'Product Service Request',
	key: 'Product',
	requests: ['product:create']
})

const ProductResponder = new cote.Responder({
	name: 'Product Service Response',
	key: 'Product',
	respondsTo: ['product:create']
})

ProductResponder.on('product:create', async (req, cb) => {
	try {
		const checkProduct = await products.findOne({ product_name: req.body.product_name })

		if (checkProduct) {
			cb(null, { statusCode: 409, message: 'product already exist' })
		}

		const saveProduct = await products.create({
			product_name: req.body.product_name,
			product_price: req.body.product_price,
			product_stock: req.body.product_stock,
			created_at: new Date()
		})

		if (saveProduct) {
			cb(null, { statusCode: 200, message: 'add product successfuly' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

// ProductService.on('product:results', (req, cb) => {})
// ProductService.on('product:result', (req, cb) => {})
// ProductService.on('product:update', (req, cb) => {})
// ProductService.on('product:delete', (req, cb) => {})

module.exports = { ProductResponder, ProductRequester }
