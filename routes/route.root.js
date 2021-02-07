const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('<h1>Microservice is running using Cote.js</h1>'))

module.exports = router
