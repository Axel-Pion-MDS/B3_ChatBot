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

## APIs

### Omdb

Gets informations about a movie

| Command | Parameter | Result |
| ------- | --------- | ------ |
| movie | interstellar | Returns informations about the Interstellar movie |

### Nasa

Gets a random picture of Mars

| Command | Parameter | Result |
| ------- | --------- | ------ |
| nasa | Ø | Returns a random picture of Mars |

### Spoonacular

Gets a random picture of a dish from a country

| Command | Parameter | Result |
| ------- | --------- | ------ |
| food | korean | Returns a random korean dish |
