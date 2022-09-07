import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from 'http-status-codes';

import { UserDto, UserModel } from '../models';

const getBodyData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
};

export class UserController {
  private userModel = new UserModel();

  create = async (req: IncomingMessage, res: ServerResponse) => {
    const data = await getBodyData(req);
    const userDto = JSON.parse(data) as UserDto;
    const newUser = await this.userModel.create(userDto);

    res.writeHead(StatusCodes.CREATED, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(newUser));
  };

  findAll = async (_: IncomingMessage, res: ServerResponse) => {
    const users = await this.userModel.findAll();

    res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  };
}
