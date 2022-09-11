import { v4 as generateId } from 'uuid';

import { NotFoundError } from '../errors';
import { User, UserDto } from '../models';

type Data = {
  users: User[];
};

export class Database {
  private static instance: Database;

  private readonly data = {
    users: [],
  } as Data;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  async addUser(user: UserDto): Promise<User> {
    const newUser = {
      id: generateId(),
      ...user,
    };

    this.data.users = [...this.data.users, newUser];

    const users = this.data.users;
    return users[users.length - 1];
  }

  async getAllUsers(): Promise<User[]> {
    return this.data.users;
  }

  async findOneById(id: string): Promise<User> {
    const users = this.data.users;
    const user = users.find((user) => user.id === id);

    if (!user) throw new NotFoundError(`User with id ${id} not found`);

    return user;
  }

  static create(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
