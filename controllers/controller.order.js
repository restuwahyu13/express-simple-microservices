const products = require('../models/model.product')
const { OrderRequester } = require('../services/service.order')
const { streamBox } = require('../utils/util.stream')

exports.controller = {
	createOrder: (req, res) => {
		OrderRequester.send({ type: 'order:create', body: req.body }, (error, result) => {
			if (result.statusCode >= 400) {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			} else {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			}
		})
	},
	resultsOrder: (req, res) => {
		OrderRequester.send({ type: 'order:results' }, (error, result) => {
			if (result.statusCode >= 400) {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			} else {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message,
					orders: result.orders
				})
			}
		})
	},
	resultOrder: (req, res) => {
		OrderRequester.send({ type: 'order:result', params: req.params }, (error, result) => {
			if (result.statusCode >= 400) {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			} else {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message,
					order: result.order
				})
			}
		})
	},
	deleteOrder: (req, res) => {
		OrderRequester.send({ type: 'order:delete', params: req.params }, (error, result) => {
			if (result.statusCode >= 400) {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			} else {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			}
		})
	},
	updateOrder: (req, res) => {
		OrderRequester.send({ type: 'order:update', params: req.params, body: req.body }, (error, result) => {
			if (result.statusCode >= 400) {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			} else {
				streamBox(res, result.statusCode, {
					method: req.method,
					statusCode: result.statusCode,
					message: result.message
				})
			}
		})
	}
}
