const cote = require('cote')
const port = process.env.PORT || 5000
new cote.MonitoringTool(port)
