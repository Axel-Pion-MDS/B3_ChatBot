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
/**
 * Setting base route for the chatbot
 */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

const users = {};

// TODO
/**
 * Listens on events when a user connects
 */
io.on('connection', (socket) => {
  socket.emit('userList', users);

  /**
   * Listens when a user has disconnected
   * Emits the disconnected user to the chat
   * Deletes its nickname from the users array
   */
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log(`${socket.pseudo} has disconnected from the channel`);
    socket.broadcast.emit('userLeave', users[socket.id]);
    delete users[socket.id];
  });

  /**
   * Gets the nickname of a user when loging in
   * Adds the nickname to the users array
   * Emits the user to the chat
   */
  socket.on('pseudo', (pseudo) => {
    users[socket.id] = pseudo;
    socket.pseudo = pseudo;

    // eslint-disable-next-line no-console
    console.log(`${pseudo} has connected to the channel`);
    socket.broadcast.emit('userJoin', pseudo);
  });

  /**
   * Gets the message the users has typed
   * Emits the message and the user to the chat
   */
  socket.on('typingMessage', (message) => {
    // eslint-disable-next-line no-console
    console.log(`${socket.pseudo} / ${users[socket.id]} has sent : ${message}`);
    socket.broadcast.emit('messageForOtherUsers', users[socket.id], message);
  })

  /**
   * Gets the user is typing event
   * Emits the event to the chat
   */
  socket.on('userIsWriting', (pseudo) => {
    socket.broadcast.emit('writingUser', pseudo);
  })

  /**
   * Gets the event when user is not typing anymore
   * Emits the event to the chat
   */
  socket.on('userIsNotWriting', (pseudo) => {
    socket.broadcast.emit('notWritingUser');
  })

  /**
   * Gets bot's message
   * Emits the bot's message to the chat
   */
  socket.on('botMessageForOthers', (message) => {
    socket.broadcast.emit('botMessageToOthers', message);
  })
});

// ? Server listening
/**
 * Server listening on port 3000
 * Allowing different ip using '0.0.0.0'
 */
server.listen(3000, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000');
});
