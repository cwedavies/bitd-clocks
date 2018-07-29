import server from './server';


const PORT = 3001;

server()
  .listen(PORT, (err) => {
    if (err) return console.error('oops');
    console.log(`server is listening on ${PORT}`);
  });
