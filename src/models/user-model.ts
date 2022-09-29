import { Database } from '../database';
import { Model, Rule } from '../framework';

/*
  Now when we want update User, we should put all props of UserDto,
  because our rules created for create method of Model, and not adapted
  for update method where field can be not required.

  Method rules of Model looks like class-validator in Next, and can be
  moved on a separate layer.

  Think about how it is possible to use such DTOs:
  CreateUserDto, UpdateUserDto, UserViewDto.
*/

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserDto = {
  username: string;
  age: number;
  hobbies: string[];
};

export class UserModel extends Model {
  private readonly database = Database.create();

  username = '';
  age = null;
  hobbies = [];

  async create(dto: UserDto): Promise<User> {
    return this.database.addUser(dto);
  }

  async findAll(): Promise<User[]> {
    return this.database.getAllUsers();
  }

  async findOneById(id: string): Promise<User> {
    return this.database.findOneById(id);
  }

  async update(id: string, dto: UserDto): Promise<User> {
    return this.database.updateUser(id, dto);
  }

  async remove(id: string): Promise<void> {
    return this.database.removeUser(id);
  }

  protected rules() {
    return {
      username: {
        [Rule.Required]: true,
        [Rule.String]: true,
      },
      age: {
        [Rule.Required]: true,
        [Rule.Number]: true,
        [Rule.Max]: 60,
        [Rule.Min]: 18,
      },
      hobbies: {
        [Rule.Required]: true,
        [Rule.Array]: true,
      },
    };
  }
}
