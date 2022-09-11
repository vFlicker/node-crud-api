import { StatusCodes } from 'http-status-codes';

export type Errors = string[];

export class ValidationError extends Error {
  code: StatusCodes;
  errors: Errors;

  constructor(errors: Errors) {
    super();

    this.name = this.constructor.name;
    this.code = StatusCodes.BAD_REQUEST;
    this.errors = errors;
  }
}
