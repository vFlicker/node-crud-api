import { config } from './config';
import { createServer } from './server';

const PORT = config.PORT || 3000;
const HOSTNAME = config.HOST_NAME || 'localhost';

const server = createServer();

server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening on port: http://${HOSTNAME}:${PORT}`);
});
