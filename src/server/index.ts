import http from 'http';

export const createServer = () => {
  const server = http.createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Success'));
  });

  return server;
};
