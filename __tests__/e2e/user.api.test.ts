import { StatusCodes } from 'http-status-codes';

import { User, UserDto } from '../../src/models';
import { userRoutes } from '../endpoints';
import { request } from '../lib';

const createUserDto: UserDto = {
  username: 'TEST_NAME',
  age: 18,
  hobbies: ['hobby_1', 'hobby_2'],
};

const nonExistentId = 'non-existent-id';
const randomUuidV4 = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';

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
        responses.every(
          ({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST,
        ),
      ).toBe(true);
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

      const { id: createdId } = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      // Search
      const searchResponse = await request
        .get(userRoutes.getOneById(createdId))
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

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await request
        .get(userRoutes.getOneById(nonExistentId))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      // Search
      const searchResponse = await request
        .get(userRoutes.getOneById(randomUuidV4))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('PUT', () => {
    it('should correctly update username', async () => {
      // Create
      const creationResponse = await request
        .post(userRoutes.create)
        .set(commonHeaders)
        .send(createUserDto);

      const { id: createdId, ...user } = creationResponse.body as User;

      expect(creationResponse.status).toBe(StatusCodes.CREATED);

      // Update
      const updateResponse = await request
        .put(userRoutes.update(createdId))
        .set(commonHeaders)
        .send({
          ...user,
          username: 'NEW_NAME',
        });

      const { id, username, age, hobbies } = updateResponse.body as User;

      expect(updateResponse.statusCode).toBe(StatusCodes.OK);

      expect(id).toBe(createdId);
      expect(username).toBe(createUserDto.username);
      expect(age).toBe(createUserDto.age);
      expect(hobbies).toStrictEqual(createUserDto.hobbies);

      // Delete
      const cleanupResponse = await request
        .delete(userRoutes.delete(createdId))
        .set(commonHeaders);

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await request
        .get(userRoutes.getOneById(nonExistentId))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      const response = await request
        .put(userRoutes.update(randomUuidV4))
        .set(commonHeaders)
        .send(createUserDto);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
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

    it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
      const response = await request
        .get(userRoutes.getOneById(nonExistentId))
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
      // Create
      const cleanupResponse = await request
        .delete(userRoutes.delete(randomUuidV4))
        .set(commonHeaders);

      expect(cleanupResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
