import { GetUser } from "./../use-cases/user/getUser.js";
import { UserImplementation } from "./repositoryImplementation/User.js";
import { LoginUser } from "../use-cases/auth/loginUser.js";
import { LogoutUser } from "../use-cases/auth/logoutUser.js";
import { RegisterUser } from "../use-cases/auth/registerUser.js";
import { AuthImplementation } from "./repositoryImplementation/Auth.js";
import JwtTokenImpementation from "./repositoryImplementation/JwtToken.js";
import { RefreshToken } from "../use-cases/auth/refreshToken.js";

class DIContainer {
  private static _jwtRepository = new JwtTokenImpementation();
  private static _authRepository = new AuthImplementation(this._jwtRepository);
  // private static _userRepository = new SequelizeGenericRepository(UserModal);
  private static _userRepository = new UserImplementation();

  static getAuthRepository() {
    return this._authRepository;
  }
  static getUserRepository() {
    return this._userRepository;
  }
  static getJwtRepository() {
    return this._jwtRepository;
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
