import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response) => Promise<Response>;

/**
 * @deprecated - Do not use this function
 */
export const asyncHandler = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
