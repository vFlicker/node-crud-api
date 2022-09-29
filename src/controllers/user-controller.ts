import { StatusCodes } from 'http-status-codes';

import { Controller, Request, Response, ValidationError } from '../framework';
import { UserDto, UserModel } from '../models';

const invalidUserIdMessage = (id: string) => {
  return `User id ${id} is invalid (not uuid)`;
};

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

    const id = req.params.id;
    userModel.uuidV4Validate(id, invalidUserIdMessage(id));

    const user = await userModel.findOneById(id);
    this.send(res, StatusCodes.OK, user);
  };

  update = async (req: Request, res: Response) => {
    const userModel = new UserModel();

    const id = req.params.id;
    userModel.uuidV4Validate(id, invalidUserIdMessage(id));

    const userDto = await this.bodyParser<UserDto>(req);
    userModel.loadData(userDto);

    if (!userModel.validate()) {
      throw new ValidationError(userModel.errors);
    }

    const newUser = await userModel.update(id, userDto);
    this.send(res, StatusCodes.OK, newUser);
  };

  remove = async (req: Request, res: Response) => {
    const userModel = new UserModel();

    const id = req.params.id;
    userModel.uuidV4Validate(id, invalidUserIdMessage(id));

    await userModel.remove(id);
    this.send(res, StatusCodes.NO_CONTENT);
  };
}
