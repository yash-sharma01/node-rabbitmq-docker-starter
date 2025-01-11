import type { Response } from "express";
import { APIResponseTypes } from "../types/api-response.types";

export default class APIResponse {
  public static success(
    res: Response,
    message: string,
    data: unknown = null,
    paginate: APIResponseTypes.Paginate | null = null
  ) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: message || "Success",
      data,
      paginate,
    });
  }

  public static created(res: Response, message: string, data: unknown = null) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: message || "Created",
      data,
    });
  }

  public static badRequest(
    res: Response,
    message: string,
    data: unknown = null
  ) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: message || "Bad Request Error",
      error: data,
    });
  }

  public static notFound(res: Response, message: string, data: unknown = null) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: message || "Not Found",
      data,
    });
  }

  public static error(res: Response, message: string, data: unknown = null) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: message || "Internal Server Error",
      error: data,
    });
  }

  public static forbiddenError(res: Response, message: string) {
    res.status(403).json({
      success: false,
      statusCode: 403,
      message: message || "Forbidden Error",
      data: null,
    });
  }

  public static authenticationError(res: Response, message: string) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: message || "Authentication Error",
      data: null,
    });
  }

  public static genericResponse(
    res: Response,
    message: string,
    statusCode: number,
    data: any
  ) {
    res.status(statusCode).json({
      success: statusCode < 400,
      statusCode,
      message,
      data,
    });
  }
}
