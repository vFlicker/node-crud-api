import { v4 as generateId } from 'uuid';

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

export class UserModel {
  private users = [] as User[];

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
}
