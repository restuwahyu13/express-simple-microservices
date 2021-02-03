const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)

require('./middlewares/middleware.plugin')(app)
require('./middlewares/middleware.route')(app)

mongoose.Promise = global.Promise
mongoose
	.connect(process.env.MONGO_URI, {
		useFindAndModify: true,
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('database connected'))
	.catch(() => console.log('database not connected'))

server.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))
