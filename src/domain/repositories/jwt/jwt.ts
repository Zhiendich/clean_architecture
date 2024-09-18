import { User } from "../../entities/user.js";

export interface JwtTokenRepository {
  generateTokens(payload: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  saveToken(userId: number, refreshToken: string): void;
  removeToken(refreshToken: string): {};
  validateAccessToken(token: string): Promise<User | null>;
  validateRefreshToken(token: string): Promise<User | null>;
  findToken(refreshToken: string): {};
}
