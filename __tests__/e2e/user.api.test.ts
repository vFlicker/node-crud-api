import { StatusCodes } from 'http-status-codes';

import { User } from '../../src/models';
import { userRoutes } from '../endpoints';
import { request } from '../lib';

const createUserDto = {
  username: 'TEST_NAME',
  age: 18,
  hobbies: ['hobby_1', 'hobby_2'],
};

const nonExistentId = 'non-existent-id';

describe('api/users', () => {
  const commonHeaders = { Accept: 'application/json' };

  describe('POST', () => {
    it('should correctly create user', async () => {
      // Create
      const creationResponse = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id, username, age, hobbies } = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      expect(typeof id).toBe('string');
      expect(username).toBe(createUserDto.username);
      expect(age).toBe(createUserDto.age);
      expect(hobbies.length).toBe(2);

      // Delete
      const cleanupResponse = await request
        .delete(userRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
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
      // Search
      const searchResponse = await request
        .get(userRoutes.getAll)
        .set(commonHeaders);

      expect(searchResponse.status).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Array);
    });

    it('should correctly get user by id', async () => {
      // Create
      const creationResponse = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const creationResponseBody = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      // Search
      const searchResponse = await request
        .get(userRoutes.getOneById(creationResponseBody.id))
        .set(commonHeaders);

      const { id, username, age, hobbies } = searchResponse.body as User;

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);

      expect(typeof id).toBe('string');
      expect(username).toBe(createUserDto.username);
      expect(age).toBe(createUserDto.age);
      expect(hobbies.length).toBe(2);

      // Delete
      const cleanupResponse = await request
        .delete(userRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      // Search
      const searchResponse = await request
        .get(userRoutes.getOneById(nonExistentId))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('DELETE', () => {
    it('should correctly delete user', async () => {
      // Create
      const creationResponse = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id } = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      // Delete
      const cleanupResponse = await request
        .delete(userRoutes.delete(id))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);

      // Search
      const searchResponse = await request
        .get(userRoutes.getOneById(id))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      // Create
      const cleanupResponse = await request
        .delete(userRoutes.delete(nonExistentId))
        .set(commonHeaders);

      expect(cleanupResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
