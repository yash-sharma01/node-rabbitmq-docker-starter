import jwt from "jsonwebtoken";
import { env } from "../config/env";

export class AuthService {
  public generateAccessToken(user: any): string {
    return jwt.sign(
      { id: user._id, roles: user.roles },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );
  }

  public generateRefreshToken(user: any): string {
    return jwt.sign({ id: user._id }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
}
