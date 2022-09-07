import { IncomingMessage, ServerResponse } from 'http';

import { UserModel } from '../models';

export class UserController {
  constructor(public UserModel: UserModel) {}

  async create(_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('created'));
  }

  async findAll(_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }
}
