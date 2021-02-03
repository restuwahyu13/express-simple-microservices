const products = require('../models/model.product')
const { ProductRequester } = require('../services/service.product')
const { streamBox } = require('../utils/util.stream')

exports.controller = {
	createProduct: (req, res) => {
		ProductRequester.send({ type: 'product:create', body: req.body }, (error, result) => {
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
	resultsProduct: (req, res) => {
		ProductRequester.send({ type: 'product:results' }, (error, result) => {
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
	resultProduct: (req, res) => {
		ProductRequester.send({ type: 'product:result', params: req.params }, (error, result) => {
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
	deleteProduct: (req, res) => {
		ProductRequester.send({ type: 'product:delete', params: req.params }, (error, result) => {
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
	updateProduct: (req, res) => {
		ProductRequester.send({ type: 'product:update', params: req.params, body: req.body }, (error, result) => {
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
