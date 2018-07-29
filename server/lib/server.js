import _ from 'lodash/fp';
import http from 'http';
import socketio from 'socket.io';

import buildStore from './store';

export default function server(log) {
  const store = buildStore();
  const server = http.createServer();
  const io = socketio(server, { path: '/api', serveClient: false });

  io.on('connection', socket => {
    log.info(`connection ${socket.id}`);

    store.changes(_.compose([emitAction(socket), clockUpdate]));
    //socket.emit('action', { type: 'clock/UPDATE', ticks: 2 });
    socket.on('action', ({type}) => {
      if (type === 'clock/TICKDOWN') {
        store.tickdown();
      }
    });
  });

  return server;
}

function clockUpdate(ticks) {
  return { type: 'clock/UPDATE', ticks };
}

function emitAction(socket) {
  return action => {
    socket.emit('action', action);
  };
}
