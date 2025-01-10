import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    ApiResponse.error(res, err.message, err.data, err.statusCode);
    return;
  }

  ApiResponse.error(res, "Internal server error", null, 500);
};
