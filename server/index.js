const server = require('http').createServer();

const PORT = 3001;

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false
});

var ticks = 2;

const TICK = 'clock/TICK';
const UPDATE = 'clock/UPDATE';

io.on('connect', (socket) => {
  console.log(`connection from socket ${socket.id}`);
  socket.emit('action', { type: UPDATE, ticks: ticks });
  socket.on('action', (action) => {
    reducer(action);
  });
});


server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


function reducer(action) {
  switch(action.type) {
    case TICK:
      return updateTicks(ticks + action.increment);
    case UPDATE:
      return updateTicks(action.ticks);
  }
}

function updateTicks(newTicks) {
  newTicks = clamp(newTicks, 0, 6);

  if (ticks === newTicks) {
    return;
  }

  ticks = newTicks;
  console.log('ticks ', ticks)
  io.emit('action', { type: UPDATE, ticks: ticks });
}

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}
