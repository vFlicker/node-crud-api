import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  code: StatusCodes;
  message: string;

  constructor(message?: string) {
    super();

    this.name = this.constructor.name;
    this.code = StatusCodes.NOT_FOUND;
    this.message = message ?? 'Not found';
  }
}
