import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from 'http-status-codes';

import { ValidationError } from '../errors';
import { Controller } from '../framework/controller';
import { UserDto, UserModel } from '../models';

export class UserController extends Controller {
  userModel = new UserModel();

  create = async (req: IncomingMessage, res: ServerResponse) => {
    const userDto = await this.bodyParser<UserDto>(req);
    this.userModel.loadData(userDto);

    if (!this.userModel.validate()) {
      throw new ValidationError(this.userModel.errors);
    }

    const newUser = await this.userModel.create(userDto);
    this.send(res, StatusCodes.CREATED, newUser);
  };

  findAll = async (_: IncomingMessage, res: ServerResponse) => {
    const users = await this.userModel.findAll();
    this.send(res, StatusCodes.OK, users);
  };
}
