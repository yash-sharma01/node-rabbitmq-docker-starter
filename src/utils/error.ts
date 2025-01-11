export type ValidationError = {
  param: string;
  message: string;
  type: string;
};

/**
 * BaseError class
 */
export class BaseError extends Error {
  public code: number;

  public type: string;

  public data: any;

  constructor(code: number, message: string, type: string, data: any) {
    super(message);
    this.code = code;
    this.type = type;
    this.data = data;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApplicationError extends BaseError {
  constructor(message: string, data: any = {}) {
    super(500, message, "ApplicationError", data);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string, data: any = {}) {
    super(401, message, "AuthenticationError", data);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string, data: any = {}) {
    super(403, message, "AuthorizationError", data);
  }
}

// BadRequestError will be thrown when there is an error in the incoming request.
// When Express `params`, `query`, or `body` doesn't follow the expected schema in validations.
export class BadRequestError extends BaseError {
  constructor(message: string, errorList: ValidationError[] = []) {
    super(400, message, "BadRequestError", errorList);
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string, data: any = {}) {
    super(500, message, "DatabaseError", data);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, data: any = {}) {
    super(404, message, "NotFoundError", data);
  }
}
