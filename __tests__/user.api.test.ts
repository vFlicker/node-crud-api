import { StatusCodes } from 'http-status-codes';

import { User } from '../src/models';
import { userRoutes } from './endpoints';
import { request } from './lib';

const createUserDto = {
  username: 'TEST_NAME',
  age: 18,
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

    it('should respond with BAD_REQUEST in case of invalid required data', async () => {
      const responses = await Promise.all([
        request.post(userRoutes.create).set(commonHeaders).send({}),
        request
          .post(userRoutes.create)
          .set(commonHeaders)
          .send({ username: 'TEST_NAME', age: 18, hobbies: '' }),
        request
          .post(userRoutes.create)
          .set(commonHeaders)
          .send({ username: 'TEST_NAME', age: '18', hobbies: [] }),
      ]);

      expect(
        responses.map(
          ({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST,
        ),
      ).toStrictEqual([true, true, true]);
    });
  });

  describe('GET', () => {
    it('should correctly get all users', async () => {
      const response = await request.get(userRoutes.getAll).set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly get user by id', async () => {
      const creationResponse = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const creationResponseBody = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      const searchResponse = await request
        .get(userRoutes.getOneById(creationResponseBody.id))
        .set(commonHeaders);

      const { id, username, age, hobbies } = searchResponse.body as User;

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);

      expect(typeof id).toBe('string');
      expect(username).toBe(createUserDto.username);
      expect(age).toBe(createUserDto.age);
      expect(hobbies.length).toBe(2);
    });
  });
});
