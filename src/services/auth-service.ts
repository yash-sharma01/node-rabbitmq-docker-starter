import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { env } from "../config/env";

export class AuthService {
  public generateAccessToken(user: any): string {
    return jwt.sign(
      { id: user._id, roles: user.roles },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
  }

  public verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
      return decoded as JwtPayload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return { error: true, message: "Access token expired" };
      } else if (err instanceof JsonWebTokenError) {
        return { error: true, message: "Invalid token" };
      } else {
        return {
          error: true,
          message: `Error verifying token: ${JSON.stringify(err)}`,
        };
      }
    }
  }

  public generateRefreshToken(user: any): string {
    return jwt.sign({ id: user._id }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
}
