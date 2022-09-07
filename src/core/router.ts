import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from 'http-status-codes';

type Method = string;

type Callback = (req: IncomingMessage, res: ServerResponse) => void;

type Resolver = Record<string, Callback>;

type Routes = Record<Method, Resolver>;

const HEADERS = { 'Content-Type': 'application/json' };

export class Router {
  private routes = {
    GET: {},
    POST: {},
  } as Routes;

  get(path: string, callback: Callback): void {
    this.routes.GET[path] = callback;
  }

  post(path: string, callback: Callback): void {
    this.routes.POST[path] = callback;
  }

  resolve = async (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;

    if (!method || !url || !this.routes[method][url]) {
      res.writeHead(StatusCodes.NOT_FOUND, HEADERS);
      res.end(JSON.stringify({ message: 'Route not found' }));
      return;
    }

    try {
      await this.routes[method][url](req, res);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, HEADERS);
      res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
  };
}
