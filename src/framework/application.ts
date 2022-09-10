import http from 'http';

import { Router } from './router';

type Config = {
  port: number;
  hostname: string;
};

export class Application {
  public router = new Router();

  constructor(public config: Config) {}

  run() {
    const { port, hostname } = this.config;

    http.createServer(this.router.resolve).listen(port, hostname, () => {
      const serverAddress = `http://${hostname}:${port}`;
      console.log(`Listening on port: ${serverAddress}`);
    });
  }
}