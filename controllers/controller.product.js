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
	resultsProduct: (req, res) => {},
	resultProduct: (req, res) => {},
	deleteProduct: (req, res) => {},
	updateProduct: (req, res) => {}
}
