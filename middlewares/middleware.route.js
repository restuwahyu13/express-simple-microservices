const productRoute = require('../routes/route.product')

module.exports = (app) => {
	app.use('/api/v1', productRoute)
}
