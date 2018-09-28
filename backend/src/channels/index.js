import http from 'http';
import { createClient as redis } from 'redis';
import socketServer from 'socket.io';
import session from '../config/session';
import adapter from 'socket.io-redis';
import config from '../config';
import chatChannel from './chat.channel';

const init = app => {
  const server = http.Server(app);
	const io = socketServer(server);

	// Force Socket.io to ONLY use "websockets"; No Long Polling.
	io.set('transports', ['websocket']);

	// Using Redis
	let port = config.redis.port;
	let host = config.redis.host;
	let password = config.redis.password;
	let pubClient = redis(port, host, { auth_pass: password });
	let subClient = redis(port, host, { auth_pass: password, return_buffers: true });
	io.adapter(adapter({ pubClient, subClient }));

	// Allow sockets to access session data
	io.use((socket, next) => {
		session(socket.request, {}, next);
	});

	// Define all Events
	chatChannel(io);

	// The server object will be then used to list to a port number
	return server;
}

export default init;