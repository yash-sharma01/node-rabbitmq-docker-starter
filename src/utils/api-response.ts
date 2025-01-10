import { Response } from "express";

export class ApiResponse {
  constructor(
    private readonly statusCode: number,
    private readonly success: boolean,
    private readonly message: string,
    private readonly data?: any
  ) {}

  public static success(
    res: Response,
    message: string,
    data: unknown,
    statusCode: number = 200
  ): Response {
    return new ApiResponse(statusCode, true, message, data).send(res);
  }

  public static error(
    res: Response,
    message: string,
    data: unknown,
    statusCode: number = 500
  ): Response {
    return new ApiResponse(statusCode, false, message, data).send(res);
  }

  private send(res: Response): Response {
    console.log({
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    });
    return res.status(this.statusCode).json({
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    });
  }
}
