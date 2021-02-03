const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
	product_name: {
		type: String,
		trim: true,
		required: [true, 'product_name is required']
	},
	product_price: {
		type: Number,
		trim: true,
		required: [true, 'product_price is required']
	},
	product_stock: {
		type: Number,
		trim: true,
		required: [true, 'product_stock is required']
	},
	created_at: {
		type: Date,
		default: new Date()
	},
	updated_at: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model('products', ProductSchema)
