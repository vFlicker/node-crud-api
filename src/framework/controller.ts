import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from 'http-status-codes';

export class Controller {
  protected bodyParser<T>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => resolve(JSON.parse(body)));
      req.on('error', reject);
    });
  }

  protected send<T>(
    res: ServerResponse,
    statusCode: StatusCodes,
    data?: T,
    header = { 'Content-Type': 'application/json' },
  ): void {
    res.writeHead(statusCode, header);
    res.end(JSON.stringify(data));
  }
}
