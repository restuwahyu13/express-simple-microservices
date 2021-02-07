require('dotenv/config')
const zlib = require('zlib')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')

module.exports = (app) => {
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json({ limit: '1mb' }))
	app.use(helmet({ contentSecurityPolicy: false }))
	app.use(cors())
	app.use(
		compression({
			level: 9,
			strategy: zlib.constants.Z_RLE
		})
	)
	if (process.env.NODE_ENV !== 'production') {
		app.use(morgan('dev'))
	}
}
