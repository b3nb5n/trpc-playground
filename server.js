const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
	const file = req.url === '/' ? 'index.html' : req.url;
	fs.readFile(`${__dirname}/build/${file}`, (err, data) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('404: File not found');
			return;
		}

		const contentType = file.endsWith('.js') ? 'text/javascript' : 'text/html';
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	});
});

const port = 3000;
server.listen(port, () => console.log(`Playground running on: http://localhost:${port}`));
