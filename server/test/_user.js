import _ from 'lodash/fp';

export function buildCache(connectDefault) {
  const cache = {};

  return (name, connect) => {
    const cached = cache[name];
    if (cached) {
      return cached.then(_.set('actions', []));
    }

    return (cache[name] = resolve(connect || connectDefault));
  };
}

export function actions(user) {
  return user['actions'];
}

export function lastAction(user) {
  return _.last(actions(user)) || null;
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

