import server from './server';
import { createLogger, transports, format } from 'winston';

const PORT = 3001;

const log = createLogger({
  level: 'info',
  transports: [
    new transports.Console({ format: format.simple() })
  ]
});

server(log)
  .listen(PORT, (err) => {
    if (err) return log.error('oops');
    log.info(`server is listening on ${PORT}`);
  });
