import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth-service";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authorization header missing or improperly formatted",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const authService = new AuthService();

    const decoded = authService.verifyAccessToken(token);

    if (decoded.error) {
      res.status(401).json({ message: decoded.message || "Invalid token" });
      return;
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
