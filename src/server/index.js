const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../index.html'));
});

io.on('connection', (client) => {
	console.log('An user has connected with id: ' + client.id);
})

server.listen(3000, () => {
	console.log("Server listening on port 3000");
})
