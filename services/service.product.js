const cote = require('cote')
const products = require('../models/model.product')

const ProductRequester = new cote.Requester({
	name: 'Product Service Request',
	key: 'Product',
	requests: ['product:create', 'product:results', 'product:result', 'product:delete', 'product:update']
})

const ProductResponder = new cote.Responder({
	name: 'Product Service Response',
	key: 'Product',
	respondsTo: ['product:create', 'product:results', 'product:result', 'product:delete', 'product:update']
})

/**
 * @description create product service
 */

ProductResponder.on('product:create', async (req, cb) => {
	try {
		const checkProduct = await products.findOne({ product_name: req.body.product_name })

		if (checkProduct) {
			cb(null, { statusCode: 409, message: 'product already exist' })
		} else {
			const createProduct = await products.create({
				product_name: req.body.product_name,
				product_price: req.body.product_price,
				product_stock: req.body.product_stock,
				created_at: new Date()
			})
			if (createProduct) {
				cb(null, { statusCode: 201, message: 'add new product successfully' })
			}
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description result all product service
 */

ProductResponder.on('product:results', async (req, cb) => {
	try {
		const resultProducts = await products.find({}, { __v: 0 }).lean()

		if (resultProducts.length < 1) {
			cb(null, { statusCode: 404, message: 'product is not exist' })
		} else {
			cb(null, { statusCode: 200, message: 'product already to use', products: resultProducts })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description result product service
 */

ProductResponder.on('product:result', async (req, cb) => {
	try {
		const resultProduct = await products.findById(req.params, { __v: 0 }).lean()

		if (!resultProduct) {
			cb(null, { statusCode: 404, message: 'product id not exist or deleted from owner' })
		} else {
			cb(null, { statusCode: 200, message: 'product already to use', product: resultProduct })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description delete product service
 */

ProductResponder.on('product:delete', async (req, cb) => {
	try {
		const deleteProduct = await products.findOneAndDelete({ _id: req.params.id }).lean()

		if (!deleteProduct) {
			cb(null, { statusCode: 404, message: 'product id not exist delete product failed' })
		} else {
			cb(null, { statusCode: 200, message: 'delete product successfuly' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description update product service
 */

ProductResponder.on('product:update', async (req, cb) => {
	try {
		const updateProduct = await products
			.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						product_name: req.body.product_name,
						product_price: req.body.product_price,
						product_stock: req.body.product_stock,
						updated_at: new Date()
					}
				}
			)
			.lean()

		if (!updateProduct) {
			cb(null, { statusCode: 404, message: 'product id not exist update product failed' })
		} else {
			cb(null, { statusCode: 200, message: 'update product successfuly' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

module.exports = { ProductResponder, ProductRequester }
