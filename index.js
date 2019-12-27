const static = require('node-static')
const http = require('http')

staticServer = new static.Server()

http.createServer((req, res) => {
	req.addListener('end', () =>
		staticServer.serve(req, res)
	).resume()
}).listen(3000)
