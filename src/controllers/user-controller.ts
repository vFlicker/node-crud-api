import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from 'http-status-codes';

import { ValidationError } from '../errors';
import { Controller } from '../framework';
import { UserDto, UserModel } from '../models';

export class UserController extends Controller {
  create = async (req: IncomingMessage, res: ServerResponse) => {
    const userModel = new UserModel();
    const userDto = await this.bodyParser<UserDto>(req);
    userModel.loadData(userDto);

    if (!userModel.validate()) {
      throw new ValidationError(userModel.errors);
    }

    const newUser = await userModel.create(userDto);
    this.send(res, StatusCodes.CREATED, newUser);
  };

  findAll = async (_: IncomingMessage, res: ServerResponse) => {
    const userModel = new UserModel();
    const users = await userModel.findAll();
    this.send(res, StatusCodes.OK, users);
  };
}
