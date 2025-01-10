import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError } from "../utils/api-error";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.dir(error);
        return next(new ApiError(400, "Validation failed", error.issues));
      }
      return next(
        new ApiError(500, (error as any)?.message ?? "Unexpected error")
      );
    }
  };
};
