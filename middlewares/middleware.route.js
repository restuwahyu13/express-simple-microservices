const rootRoute = require('../routes/route.root')
const productRoute = require('../routes/route.product')
const orderRoute = require('../routes/route.order')

module.exports = (app) => {
	app.use('/', rootRoute)
	app.use('/api/v1', productRoute)
	app.use('/api/v1', orderRoute)
}
