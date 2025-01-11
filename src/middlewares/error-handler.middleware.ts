import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import {
  ApplicationError,
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  DatabaseError,
  NotFoundError,
} from "../utils/error";
import APIResponse from "../utils/response";

export const errorHandler: ErrorRequestHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof BadRequestError) {
    return APIResponse.badRequest(res, error.message, error.data);
  }
  if (error instanceof NotFoundError) {
    return APIResponse.notFound(res, error.message, error.data);
  }
  if (error instanceof DatabaseError) {
    return APIResponse.error(res, error.message, null);
  }
  if (error instanceof AuthenticationError) {
    return APIResponse.authenticationError(res, error.message);
  }
  if (error instanceof AuthorizationError) {
    return APIResponse.forbiddenError(res, error.message);
  }
  if (error instanceof ApplicationError) {
    return APIResponse.error(res, error.message, error.data);
  }

  return APIResponse.error(res, "Something went wrong", null);
};
