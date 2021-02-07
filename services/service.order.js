const core = require('cote')
const orders = require('../models/model.order')
const products = require('../models/model.product')

const OrderPublisher = new core.Publisher({
	name: 'Order Publisher',
	key: 'order'
})

const OrderSubcriber = new core.Subscriber({
	name: 'Order Subscriber',
	key: 'order'
})

const OrderRequester = new core.Requester({
	name: 'Order Requester',
	key: 'order',
	requests: ['order:create', 'order:results', 'order:result', 'order:delete', 'order:update']
})

const OrderResponder = new core.Responder({
	name: 'Order Responder',
	key: 'order',
	requests: ['order:create', 'order:results', 'order:result', 'order:delete', 'order:update']
})

/**
 * @description create order service
 */

OrderResponder.on('order:create', async (req, cb) => {
	try {
		const { product_id, customer_name, quantity } = req.body

		const createProduct = await orders.create({
			product_id,
			customer_name,
			quantity,
			created_at: new Date()
		})

		if (createProduct) {
			cb(null, { statusCode: 201, message: 'add new order successfully' })
			OrderPublisher.emit('order:product', { product_id, quantity })
		} else {
			cb(null, { statusCode: 403, message: 'add new order failed' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description result all order service
 */

OrderResponder.on('order:results', async (req, cb) => {
	// try {
	// 	const resultProducts = await products.find({}, { __v: 0 }).lean()
	// 	if (resultProducts.length < 1) {
	// 		cb(null, { statusCode: 404, message: 'product is not exist' })
	// 	} else {
	// 		cb(null, { statusCode: 200, message: 'product already to use', products: resultProducts })
	// 	}
	// } catch (error) {
	// 	cb(error, { statusCode: 500, message: 'internal server error' })
	// }
})

/**
 * @description result order service
 */

OrderResponder.on('order:result', async (req, cb) => {
	// try {
	// 	const resultProduct = await products.findById(req.params, { __v: 0 }).lean()
	// 	if (!resultProduct) {
	// 		cb(null, { statusCode: 404, message: 'product id not exist or deleted from owner' })
	// 	} else {
	// 		cb(null, { statusCode: 200, message: 'product already to use', product: resultProduct })
	// 	}
	// } catch (error) {
	// 	cb(error, { statusCode: 500, message: 'internal server error' })
	// }
})

/**
 * @description delete order service
 */

OrderResponder.on('order:delete', async (req, cb) => {
	// try {
	// 	const deleteProduct = await products.findOneAndDelete({ _id: req.params.id }).lean()
	// 	if (!deleteProduct) {
	// 		cb(null, { statusCode: 404, message: 'product id not exist delete product failed' })
	// 	} else {
	// 		cb(null, { statusCode: 200, message: 'delete product successfuly' })
	// 	}
	// } catch (error) {
	// 	cb(error, { statusCode: 500, message: 'internal server error' })
	// }
})

/**
 * @description update order service
 */

OrderResponder.on('order:update', async (req, cb) => {
	// try {
	// 	const updateProduct = await products
	// 		.findOneAndUpdate(
	// 			{ _id: req.params.id },
	// 			{
	// 				$set: {
	// 					product_name: req.body.product_name,
	// 					product_price: req.body.product_price,
	// 					product_stock: req.body.product_stock,
	// 					updated_at: new Date()
	// 				}
	// 			}
	// 		)
	// 		.lean()
	// 	if (!updateProduct) {
	// 		cb(null, { statusCode: 404, message: 'product id not exist update product failed' })
	// 	} else {
	// 		cb(null, { statusCode: 200, message: 'update product successfuly' })
	// 	}
	// } catch (error) {
	// 	cb(error, { statusCode: 500, message: 'internal server error' })
	// }
})

/**
 * @description Subscriber order service
 */

OrderSubcriber.on('order:product', async (error, req) => {
	try {
		const { _id, product_stock } = await products.findOne({ _id: req.product_id }).lean()
		const subtractStock = product_stock - req.quantity

		const updateProduct = await products
			.findOneAndUpdate(
				{ _id: _id },
				{
					$set: {
						product_stock: rsubtractStock,
						updated_at: new Date()
					}
				}
			)
			.lean()
	} catch (error) {
		console.log(error)
	}
})

module.exports = { OrderRequester, OrderResponder }
