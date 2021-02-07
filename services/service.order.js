const core = require('cote')
const orders = require('../models/model.order')
const products = require('../models/model.product')

const OrderPublisher = new core.Publisher({
	name: 'Order Publisher',
	key: 'order',
	broadcasts: ['update:product']
})

const OrderSubcriber = new core.Subscriber({
	name: 'Order Subscriber',
	key: 'order',
	subscribesTo: ['update:product']
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
			OrderPublisher.publish('update:product', { body: { product_id, quantity } })
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
	try {
		const resultOrders = await orders.find({}, { __v: 0 }).lean()
		if (resultOrders.length < 1) {
			cb(null, { statusCode: 404, message: 'order is not exist' })
		} else {
			cb(null, { statusCode: 200, message: 'order already to use', orders: resultOrders })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description result order service
 */

OrderResponder.on('order:result', async (req, cb) => {
	try {
		const resultOrder = await orders.findById(req.params, { __v: 0 }).lean()
		if (!resultOrder) {
			cb(null, { statusCode: 404, message: 'order id not exist or deleted from owner' })
		} else {
			cb(null, { statusCode: 200, message: 'order already to use', order: resultOrder })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description delete order service
 */

OrderResponder.on('order:delete', async (req, cb) => {
	try {
		const deleteOrder = await orders.findOneAndDelete({ _id: req.params.id }).lean()
		if (!deleteOrder) {
			cb(null, { statusCode: 404, message: 'order id not exist delete product failed' })
		} else {
			cb(null, { statusCode: 200, message: 'delete order successfuly' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description update order service
 */

OrderResponder.on('order:update', async (req, cb) => {
	try {
		const updateProduct = await products
			.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						product_id: req.body.product_id,
						customer_name: req.body.customer_name,
						quantity: req.body.quantity,
						updated_at: new Date()
					}
				}
			)
			.lean()
		if (!updateProduct) {
			cb(null, { statusCode: 404, message: 'order id not exist update order failed' })
		} else {
			cb(null, { statusCode: 200, message: 'update order successfuly' })
		}
	} catch (error) {
		cb(error, { statusCode: 500, message: 'internal server error' })
	}
})

/**
 * @description Subscriber order service from Publisher
 */

OrderSubcriber.on('update:product', async (req) => {
	try {
		const { product_id, quantity } = req.body
		const { _id, product_stock } = await products.findOne({ _id: product_id }).lean()
		const subtractStock = product_stock - quantity

		const updateProduct = await products
			.findOneAndUpdate(
				{ _id: _id },
				{
					$set: {
						product_stock: subtractStock,
						updated_at: new Date()
					}
				}
			)
			.lean()
	} catch (error) {
		return new Error(error)
	}
})

module.exports = { OrderRequester, OrderResponder }
