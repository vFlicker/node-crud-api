import { StatusCodes } from 'http-status-codes';

import { userRoutes } from './endpoints';
import { request } from './lib';

describe('api/users', () => {
  const commonHeaders = { Accept: 'application/json' };

  describe('GET', () => {
    it('should correctly get all users', async () => {
      const response = await request.get(userRoutes.getAll).set(commonHeaders);
      // TODO: remove 2 expect .expect(200, initialData)
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
