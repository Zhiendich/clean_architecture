import { ActivateEmail } from './../use-cases/email/activateEmail.js';
import { GetUser } from './../use-cases/user/getUser.js';
import { UserImplementation } from './repositoryImplementation/User.js';
import { LoginUser } from '../use-cases/auth/loginUser.js';
import { LogoutUser } from '../use-cases/auth/logoutUser.js';
import { RegisterUser } from '../use-cases/auth/registerUser.js';
import { AuthImplementation } from './repositoryImplementation/Auth.js';
import JwtTokenImpementation from './repositoryImplementation/JwtToken.js';
import { RefreshToken } from '../use-cases/auth/refreshToken.js';
import { Redis } from './redis/index.js';
import UserModal from './sequelize/models/user.js';
import { SequelizeGenericRepository } from './sequelize/generic.js';
import JwtModal from './sequelize/models/token.js';
import OTPImplementation from './repositoryImplementation/OTP.js';
import { GenerateOTP } from '../use-cases/otp/generateOTP.js';
import { VerifyOTP } from '../use-cases/otp/verifyOTP.js';
import { GenerateQRCode } from '../use-cases/otp/generateQRCode.js';
import { ToggleTwoFactorAuthentication } from '../use-cases/otp/toggleTwoFactor.js';
import OTPModal from './sequelize/models/otp.js';
import { EmailImplementation } from './repositoryImplementation/Email.js';
import { SendActivationEmail } from '../use-cases/email/sendActivationEmail.js';
import { UpdateUser } from '../use-cases/user/updateUser.js';

class DIContainer {
  private static _redisRepository = new Redis();
  private static _jwtRepository = new JwtTokenImpementation(
    new SequelizeGenericRepository<any>(JwtModal),
    this._redisRepository,
  );
  private static _userRepository = new UserImplementation(
    new SequelizeGenericRepository<any>(UserModal),
  );

  private static _OTPRepository = new OTPImplementation(
    new SequelizeGenericRepository<any>(OTPModal),
    this._userRepository,
  );
  private static _emailRepository = new EmailImplementation(this._userRepository);
  private static _authRepository = new AuthImplementation(
    this._jwtRepository,
    this._userRepository,
    this._OTPRepository,
    this._emailRepository,
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
  static getOTPRepository() {
    return this._OTPRepository;
  }
  static getRedisRepository() {
    return this._redisRepository;
  }
  static getEmailRepository() {
    return this._emailRepository;
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
  static updateUserUseCase() {
    return new UpdateUser(this.getUserRepository());
  }
  static refreshTokenUseCase() {
    return new RefreshToken(this.getAuthRepository());
  }
  static generateOTPUseCase() {
    return new GenerateOTP(this.getOTPRepository());
  }
  static verifyOTPUseCase() {
    return new VerifyOTP(this.getOTPRepository());
  }
  static generateQRCodeUseCase() {
    return new GenerateQRCode(this.getOTPRepository());
  }
  static toggleTwoFactorUseCase() {
    return new ToggleTwoFactorAuthentication(this.getOTPRepository());
  }
  static sendEmailUseCase() {
    return new SendActivationEmail(this.getEmailRepository());
  }
  static activateEmailUseCase() {
    return new ActivateEmail(this.getEmailRepository());
  }
}

export { DIContainer };
