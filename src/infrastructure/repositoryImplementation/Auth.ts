import { JwtTokenRepository } from "./../../domain/repositories/jwt/jwt.js";
import { AuthRepository } from "../../domain/repositories/auth/auth.js";
import { LoginUser } from "../../domain/repositories/auth/interfaces/LoginUser.js";
import { RegistrationUser } from "../../domain/repositories/auth/interfaces/RegistrationUser.js";
import UserModal from "../postgresql/models/User.js";
import bcrypt from "bcryptjs";
import ApiError from "../../web-api/ApiError.js";

export class AuthImplementation implements AuthRepository {
  constructor(private jwtRepository: JwtTokenRepository) {}
  async login(dto: LoginUser) {
    const findUser = await UserModal.findOne({
      where: { email: dto.email },
    });
    if (!findUser) {
      throw new Error("Incorrect email or password");
    }
    const isPasswordEqual = await bcrypt.compare(
      dto.password,
      findUser.dataValues.password
    );
    if (!isPasswordEqual) {
      throw new Error("Incorrect email or password");
    }
    const tokens = this.jwtRepository.generateTokens(findUser.dataValues);
    await this.jwtRepository.saveToken(
      findUser.dataValues.id,
      tokens.refreshToken
    );
    const { password, ...userWithoutPassword } = findUser.dataValues;
    return { tokens, user: userWithoutPassword };
  }
  async registration(dto: RegistrationUser) {
    try {
      const findUser = await UserModal.findOne({
        where: { email: dto.email },
      });

      if (findUser) {
        throw new Error("User already exist");
      }
      const hashPassword = bcrypt.hashSync(dto.password, 6);
      await UserModal.create({ ...dto, password: hashPassword });
    } catch (error: any) {
      throw new Error(error.message);
    }
    return "Create";
  }
  async logout(refreshToken: string) {
    await this.jwtRepository.removeToken(refreshToken);
    return "Logout";
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorize();
    }
    const userData = await this.jwtRepository.validateRefreshToken(
      refreshToken
    );

    const tokenFromDb = await this.jwtRepository.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorize();
    }
    const user = await UserModal.findOne({ where: { id: userData.id } });
    if (user) {
      const tokens = this.jwtRepository.generateTokens({ ...user.dataValues });
      await this.jwtRepository.saveToken(
        user.dataValues.id,
        tokens.refreshToken
      );
      const { password, ...userWithoutPassword } = user.dataValues;
      return {
        tokens,
        user: userWithoutPassword,
      };
    }
    throw ApiError.notFound();
  }
}
