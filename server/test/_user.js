import _ from 'lodash/fp';

export function buildCache(connectDefault) {
  const cache = {};

  return (name, connect) => {
    return cache[name]
      ? cache[name]
      : (cache[name] = resolve(connect || connectDefault));
  };
}

export function actions(user) {
  return user['actions'];
}

export function lastAction(user) {
  return _.last(actions(user));
}

export function send(user, action) {
  user.socket.emit('action', action);
}

export function resolve(connect) {
  const user = {
    actions: [],
    socket: null,
  };

  return connect({ 'action': action => actions(user).push(action) })
    .then(socket => _.set('socket', socket, user));
}

