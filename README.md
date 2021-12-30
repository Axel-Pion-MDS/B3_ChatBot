# Chabot x Socket.io

## Install

`npm install`

## Run server

`cd ./src/server/`
`node index.js`

## Run front

`cd ./src/`
`yarn start`

## Make it work on the same network

### ./src/server/server.js

```diff
# line 5
const io = require('socket.io')(server, {
  cors: {
-    origin: 'http://192.168.1.72:9090',
+    origin: 'http://yourLocaleIp:9090',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});
```

### ./src/class/Chat.js

```diff
# line 3
- const socket = io.connect('http://192.168.1.72:3000');
+ const socket = io.connect('http://yourLocaleIp:3000');
```

### ./webpack.config.js

```diff
# line 48

  devServer: {
-    host: '192.168.1.72',
+    host: 'yourLocaleIp',
    port: 9090,
    hot: true,
    open: true,
    inline: true
  }
```
