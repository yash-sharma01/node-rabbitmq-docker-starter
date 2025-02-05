import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "yourAccessTokenSecret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? "yourRefreshTokenSecret";

export class AuthService {
  public generateAccessToken(user: any): string {
    return jwt.sign({ id: user._id, roles: user.roles }, ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
  }

  public generateRefreshToken(user: any): string {
    return jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
}
