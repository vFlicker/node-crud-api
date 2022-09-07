import _request from 'supertest';

import { config } from '../../src/config';

const PORT = config.PORT || 3000;
const HOSTNAME = config.HOST_NAME || 'localhost';

const host = `${HOSTNAME}:${PORT}`;

export const request = _request(host);
