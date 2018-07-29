import _ from 'lodash/fp';
import http from 'http';
import socketio from 'socket.io';

import buildStore from './store';

export default function server(log) {
  const store = buildStore();
  const server = http.createServer();
  const io = socketio(server, { path: '/api', serveClient: false });


  io.on('connection', socket => {
    const emitUpdate = _.compose([emitAction(socket), clockUpdate]);

    log.info(`connection ${socket.id}`);

    store.changes(emitUpdate);
    socket.on('action', handleAction(store));
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

function handleAction(store) {
  return ({ type }) => {
    if (type === 'clock/TICKDOWN') {
      store.tickdown();
    }

    if (type === 'clock/TICKUP') {
      store.tickup();
    }
  }
}
