import { v4 as generateId } from 'uuid';

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
  users = [] as User[];

  username = '';
  age = null;
  hobbies = [];

  create = async (userDto: UserDto): Promise<User> => {
    const newUser = {
      id: generateId(),
      ...userDto,
    };

    this.users = [...this.users, newUser];

    return newUser;
  };

  findAll = async (): Promise<User[]> => {
    return this.users;
  };

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
