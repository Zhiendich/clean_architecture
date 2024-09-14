import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../domain/entities/user.js";
import { JwtTokenRepository } from "../../domain/repositories/jwt/jwt.js";
import JwtModal from "../postgresql/models/Jwt.js";

dotenv.config();

class JwtTokenImpementation implements JwtTokenRepository {
  generateTokens(payload: object) {
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
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await JwtModal.findOne({ where: { userId } });

    if (tokenData) {
      return await tokenData.save();
    }
    const token = JwtModal.create({ userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken: string) {
    const tokenData = await JwtModal.destroy({ where: { refreshToken } });
    return tokenData;
  }
  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "");
      console.log("userData", userData);
      return userData as User;
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
    const tokenData = await JwtModal.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

export default JwtTokenImpementation;
