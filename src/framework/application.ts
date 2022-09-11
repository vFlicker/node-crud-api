import http from 'http';

import { Logger } from './logger';
import { Router } from './router';
import { Request, Response } from './types';

type Config = {
  port: number;
  hostname: string;
};

export class Application {
  private logger = new Logger();
  public router = new Router();

  constructor(public config: Config) {}

  run() {
    const { port, hostname } = this.config;

    http
      .createServer((req, res) => {
        return this.router.resolve(req as Request, res as Response);
      })
      .listen(port, hostname, () => {
        const serverAddress = `http://${hostname}:${port}`;
        this.logger.info(`Listening on port: ${serverAddress}`);
      });
  }
}
