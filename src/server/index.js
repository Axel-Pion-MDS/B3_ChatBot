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

// TODO
io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log(`${socket.pseudo} has disconnected from the channel`);
    socket.broadcast.emit('userLeave', socket.pseudo);
  });

  // detect the user's pseudo
  socket.on('pseudo', (pseudo) => {
    socket.pseudo = pseudo;
    console.log(`${pseudo} has connected to the channel`);
    // emit to all users
    socket.broadcast.emit('newUser', pseudo);
  });
});

// ? Server listening
server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000');
});
