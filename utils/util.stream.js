const streamBox = require('streambox-collection')

exports.streamBox = (handler, statusCode, data) => {
	streamBox.object({ ...data }).then((res) => {
		return handler.status(statusCode).json(streamBox.toObject(res))
	})
}
