import { Response } from "express";
import { APIResponseTypes } from "../types/api-response.types";
import APIResponse from "../utils/response";

export abstract class BaseController {
  constructor() {}

  public createdResponse = (
    res: Response,
    message: string,
    data: unknown = null
  ) => {
    return APIResponse.created(res, message, data);
  };

  public successResponse = (
    res: Response,
    message: string,
    data: unknown = null,
    paginate: APIResponseTypes.Paginate | null = null
  ) => {
    return APIResponse.success(res, message, data, paginate);
  };

  public notFoundResponse = (
    res: Response,
    message: string,
    data: unknown = null
  ) => {
    return APIResponse.notFound(res, message, data);
  };

  public errorResponse = (
    res: Response,
    message: string,
    data: unknown = null
  ) => {
    return APIResponse.error(res, message, data);
  };

  public badRequestResponse = (
    res: Response,
    message: string,
    data: unknown = null
  ) => {
    return APIResponse.badRequest(res, message, data);
  };

  public unauthenticatedResponse = (res: Response, message: string) => {
    return APIResponse.forbiddenError(res, message);
  };

  public forbiddenResponse = (res: Response, message: string) => {
    return APIResponse.forbiddenError(res, message);
  };

  public genericResponse = (
    res: Response,
    message: string,
    statusCode: number,
    data?: any
  ) => {
    return APIResponse.genericResponse(res, message, statusCode, data ?? null);
  };
}
