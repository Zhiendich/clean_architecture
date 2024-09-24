import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../domain/entities/user.js";
import { JwtTokenRepository } from "../../domain/repositories/jwt/jwt.js";
import ApiError from "../../web-api/error/index.js";
import { Redis } from "../redis/index.js";
import { SequelizeGenericRepository } from "../sequelize/generic.js";

dotenv.config();

class JwtTokenImpementation implements JwtTokenRepository {
  constructor(
    private redis: Redis,
    private jwtSequlize: SequelizeGenericRepository<any>
  ) {}
  async generateTokens(payload: User) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    await this.redis.setCache(accessToken, payload, 60 * 60);
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.jwtSequlize.findOne({ where: { userId } });
    if (tokenData) {
      await tokenData.update({ refreshToken });
      return refreshToken;
    }
    const token = await this.jwtSequlize.create({ userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken: string) {
    const tokenData = await this.jwtSequlize.delete({ refreshToken });
    return tokenData;
  }
  async validateAccessToken(token: string) {
    try {
      const userData = await new Promise<User | null>((resolve, reject) => {
        jwt.verify(
          token,
          process.env.JWT_ACCESS_SECRET || "",
          async (error, decoded) => {
            if (error) {
              return reject(ApiError.notFound());
            }

            const cachedUserData = await this.redis.getCache(token);

            if (cachedUserData) {
              return resolve(cachedUserData as User);
            } else {
              return reject(ApiError.notFound());
            }
          }
        );
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "");
      return userData as User;
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken: string) {
    const tokenData = await this.jwtSequlize.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }
}

export default JwtTokenImpementation;
