import './index.scss';
import './assert/img/send.png';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');
