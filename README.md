# Chabot x Socket.io

![nodeJsVersion16.13.1](https://img.shields.io/badge/NodeJS-v.16.13.1-blue)

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
-    origin: 'http://127.0.0.1:9090',
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
- const socket = io.connect('http://127.0.0.1:3000');
+ const socket = io.connect('http://yourLocaleIp:3000');
```

### ./webpack.config.js

```diff
# line 48

  devServer: {
-    host: '127.0.0.1',
+    host: 'yourLocaleIp',
    port: 9090,
    hot: true,
    open: true,
    inline: true
  }
```

## In case of ERR on `aggregate-error`

An error with the `aggregate-error` package can sometimes randomly happens while compiling the project.

If the error occurs, copy-paste the content of `./src/assert/aggregate-error.recovery.js` into `node_modules/aggregate-error/index.js`