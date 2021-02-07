const products = require('../models/model.product')
const { OrderRequester } = require('../services/service.product')
const { streamBox } = require('../utils/util.stream')

exports.controller = {
	createOrder: (req, res) => {
		ProductRequester.send({ type: 'order:create', body: req.body }, (error, result) => {
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
		ProductRequester.send({ type: 'order:results' }, (error, result) => {
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
					products: result.products
				})
			}
		})
	},
	resultOrder: (req, res) => {
		ProductRequester.send({ type: 'order:result', params: req.params }, (error, result) => {
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
					products: result.product
				})
			}
		})
	},
	deleteOrder: (req, res) => {
		ProductRequester.send({ type: 'order:delete', params: req.params }, (error, result) => {
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
					products: result.product
				})
			}
		})
	},
	updateOrder: (req, res) => {
		ProductRequester.send({ type: 'order:update', params: req.params, body: req.body }, (error, result) => {
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
					products: result.product
				})
			}
		})
	}
}
