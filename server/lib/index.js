import http from 'http';
import socketio from 'socket.io';

const PORT = 3001;

const server = http.createServer();
const io = socketio(server, { path: '/', serveClient: false });

io.on('connection', socket => {
  console.log(`connection ${socket.id}`);
  socket.emit('action', { type: 'clock/UPDATE', ticks: 2 });
});

server.listen(PORT, (err) => {
  if (err) return console.error('oops');
  console.log(`server is listening on ${PORT}`);
});
