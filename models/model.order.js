const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
	product_id: {
		type: mongoose.Types.ObjectId,
		unique: true,
		trim: true,
		required: [true, 'product id is required']
	},
	quantity: {
		type: Number,
		trim: true,
		required: [true, 'quantity is required']
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

module.exports = mongoose.model('orders', OrderSchema)
