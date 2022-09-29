import { v4 as generateId } from 'uuid';

import { NotFoundError } from '../framework';
import { User, UserDto } from '../models';

type Data = {
  users: User[];
};

export class Database {
  private static instance: Database;

  private readonly data: Data = {
    users: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  async addUser(dto: UserDto): Promise<User> {
    const newUser = {
      id: generateId(),
      ...dto,
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

  async updateUser(id: string, dto: UserDto): Promise<User> {
    const users = this.data.users;
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundError("Can't delete unexisting user");

    this.data.users = [
      ...users.slice(0, index),
      { id, ...dto },
      ...users.slice(index + 1),
    ];

    return users[index];
  }

  async removeUser(id: string): Promise<void> {
    const users = this.data.users;
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundError("Can't delete unexisting user");

    this.data.users = [...users.slice(0, index), ...users.slice(index + 1)];
  }

  static create(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
