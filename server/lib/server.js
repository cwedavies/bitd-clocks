import http from 'http';
import socketio from 'socket.io';

export default function server() {
  const server = http.createServer();
  const io = socketio(server, { path: '/api', serveClient: false });

  io.on('connection', socket => {
    console.log(`connection ${socket.id}`);
    socket.emit('action', { type: 'clock/UPDATE', ticks: 2 });
  });

  return server;
}
