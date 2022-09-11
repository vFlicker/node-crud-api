import { StatusCodes } from 'http-status-codes';

import { NotFoundError, ValidationError } from '../errors';
import { Logger } from './logger';
import { Request, Response } from './types';
import { trimSlash } from './utils';

type Method = string;

type Callback = (req: Request, res: Response) => void;

type Resolver = Record<string, Callback | undefined>;

type Routes = Record<Method, Resolver>;

const HEADERS = { 'Content-Type': 'application/json' };

export class Router {
  private logger = new Logger();

  private routes = {
    POST: {},
    GET: {},
    DELETE: {},
  } as Routes;

  post(url: string, callback: Callback): void {
    this.routes.POST[trimSlash(url)] = callback;
  }

  get(url: string, callback: Callback): void {
    this.routes.GET[trimSlash(url)] = callback;
  }

  delete(url: string, callback: Callback): void {
    this.routes.DELETE[trimSlash(url)] = callback;
  }

  resolve = async (req: Request, res: Response) => {
    const callback = this.getCallback(req);

    if (!callback) {
      res.writeHead(StatusCodes.NOT_FOUND, HEADERS);
      res.end(JSON.stringify({ message: 'Route not found' }));
      return;
    }

    try {
      await callback(req, res);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof ValidationError) {
        res.writeHead(err.code, HEADERS);
        res.end(JSON.stringify({ message: err.errors }));
        return;
      }

      if (err instanceof NotFoundError) {
        const { code, message } = err;

        res.writeHead(code, HEADERS);
        res.end(JSON.stringify({ message }));
        return;
      }

      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, HEADERS);
      res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
  };

  private getCallback(req: Request): Callback | null {
    if (!req.method || !req.url) return null;

    const method = req.method;
    const url = trimSlash(req.url);

    // Get all routes for current request method
    const routes = this.routes[method];

    // Start iterating registered routes
    for (const [rawRoute, callback] of Object.entries(routes)) {
      const route = trimSlash(rawRoute);

      // Find all route names from route and save in routeNames
      const routeNames = route
        .match(/\:([a-zA-Z0-9_.-]*)(:[^}]+)?/g)
        ?.map((s) => s.replace(':', ''));

      // Convert route name into regex pattern
      const routeRegex =
        '^' +
        route.replace(/\:\w+(:([^}]+))?/g, () => '([a-zA-Z0-9_.-]*)') +
        '$';

      // Test and match current route against routeRegex
      const valueMatches = url.match(routeRegex);

      if (valueMatches && routeNames && callback) {
        const values = [] as string[];

        for (let index = 1; index < valueMatches.length; index++) {
          values.push(valueMatches[index]);
        }

        const routeParams = routeNames.reduce((accumulator, element, index) => {
          return { ...accumulator, [element]: values[index] };
        }, {});

        req.params = routeParams;
        return callback;
      }
    }

    const callback = routes[url];
    if (!callback) return null;

    return callback;
  }
}
