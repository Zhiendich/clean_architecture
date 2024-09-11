import { LoginUser } from "../use-cases/auth/loginUser.js";
import { RegisterUser } from "../use-cases/auth/registerUser.js";
import { AuthImplementation } from "./repositoryImplementation/Auth.js";

class DIContainer {
  private static _authRepository = new AuthImplementation();

  static getAuthRepository() {
    return this._authRepository;
  }

  static loginUserUseCase() {
    return new LoginUser(this.getAuthRepository());
  }
  static registerUserUseCase() {
    return new RegisterUser(this.getAuthRepository());
  }
}

export { DIContainer };
