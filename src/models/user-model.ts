import { Database } from '../database';
import { Model, Rule } from '../framework';

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

  async create(userDto: UserDto): Promise<User> {
    return this.database.addUser(userDto);
  }

  async findAll(): Promise<User[]> {
    return this.database.getAllUsers();
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
