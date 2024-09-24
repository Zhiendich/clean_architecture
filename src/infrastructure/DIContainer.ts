import { GetUser } from "./../use-cases/user/getUser.js";
import { UserImplementation } from "./repositoryImplementation/User.js";
import { LoginUser } from "../use-cases/auth/loginUser.js";
import { LogoutUser } from "../use-cases/auth/logoutUser.js";
import { RegisterUser } from "../use-cases/auth/registerUser.js";
import { AuthImplementation } from "./repositoryImplementation/Auth.js";
import JwtTokenImpementation from "./repositoryImplementation/JwtToken.js";
import { RefreshToken } from "../use-cases/auth/refreshToken.js";
import { Redis } from "./redis/index.js";
import UserModal from "./sequelize/models/user.js";
import { SequelizeGenericRepository } from "./sequelize/generic.js";
import JwtModal from "./sequelize/models/token.js";

class DIContainer {
  private static _redisRepository = new Redis();
  private static _jwtRepository = new JwtTokenImpementation(
    this._redisRepository,
    new SequelizeGenericRepository<any>(JwtModal)
  );
  private static _userRepository = new UserImplementation(
    new SequelizeGenericRepository<any>(UserModal)
  );
  private static _authRepository = new AuthImplementation(
    this._jwtRepository,
    new SequelizeGenericRepository<any>(UserModal)
  );

  static getAuthRepository() {
    return this._authRepository;
  }

  static getUserRepository() {
    return this._userRepository;
  }
  static getJwtRepository() {
    return this._jwtRepository;
  }
  static getRedisRepository() {
    return this._redisRepository;
  }
  static loginUserUseCase() {
    return new LoginUser(this.getAuthRepository());
  }
  static registerUserUseCase() {
    return new RegisterUser(this.getAuthRepository());
  }
  static logoutUserUseCase() {
    return new LogoutUser(this.getAuthRepository());
  }
  static getUserUseCase() {
    return new GetUser(this.getUserRepository());
  }
  static refreshTokenUseCase() {
    return new RefreshToken(this.getAuthRepository());
  }
}

export { DIContainer };
