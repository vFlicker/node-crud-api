import { StatusCodes } from 'http-status-codes';
import { User } from '../src/models';

import { userRoutes } from './endpoints';
import { request } from './lib';

const createUserDto = {
  username: 'TEST_NAME',
  age: 16,
  hobbies: ['hobby_1', 'hobby_2'],
};

describe('api/users', () => {
  const commonHeaders = { Accept: 'application/json' };

  describe('POST', () => {
    it('should correctly create user', async () => {
      const response = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id, username, age, hobbies } = response.body as User;

      expect(response.status).toBe(StatusCodes.CREATED);

      expect(typeof id).toBe('string');
      expect(username).toBe(createUserDto.username);
      expect(age).toBe(createUserDto.age);
      expect(hobbies.length).toBe(2);
    });
  });

  describe('GET', () => {
    it('should correctly get all users', async () => {
      const response = await request.get(userRoutes.getAll).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
