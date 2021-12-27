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

const users = {};

// TODO
io.on('connection', (socket) => {
  socket.emit('userList', users);

  socket.on('disconnect', () => {
    console.log(`${socket.pseudo} has disconnected from the channel`);
    socket.broadcast.emit('userLeave', users[socket.id]);
    delete users[socket.id];
  });

  socket.on('pseudo', (pseudo) => {
    users[socket.id] = pseudo;
    socket.pseudo = pseudo;
    console.log(`${pseudo} has connected to the channel`);
    socket.broadcast.emit('userJoin', pseudo);
  });

  socket.on('typingMessage', (message) => {
    console.log(`${socket.pseudo} / ${users[socket.id]} has sent : ${message}`);
    socket.broadcast.emit('messageForOtherUsers', users[socket.id], message);
  })

  socket.on('userIsWriting', (pseudo) => {
  socket.broadcast.emit('writingUser', pseudo);
  })
});

// ? Server listening
server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000');
});
