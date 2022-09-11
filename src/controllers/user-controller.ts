import { StatusCodes } from 'http-status-codes';

import { ValidationError } from '../errors';
import { Controller, Request, Response } from '../framework';
import { UserDto, UserModel } from '../models';

export class UserController extends Controller {
  create = async (req: Request, res: Response) => {
    const userModel = new UserModel();
    const userDto = await this.bodyParser<UserDto>(req);
    userModel.loadData(userDto);

    if (!userModel.validate()) {
      throw new ValidationError(userModel.errors);
    }

    const newUser = await userModel.create(userDto);
    this.send(res, StatusCodes.CREATED, newUser);
  };

  findAll = async (_: Request, res: Response) => {
    const userModel = new UserModel();
    const users = await userModel.findAll();
    this.send(res, StatusCodes.OK, users);
  };

  findOneById = async (req: Request, res: Response) => {
    const userModel = new UserModel();
    const user = await userModel.findOneById(req.params.id);
    this.send(res, StatusCodes.OK, user);
  };
}
