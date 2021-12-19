const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:9090',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});
const path = require('path');

// ? ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// ? IO
io.on('connection', (client) => {
  // eslint-disable-next-line no-console
  console.log(`An user has connected with id: ${client.id}`);
});

// TODO

// ? Server listening
server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000');
});
