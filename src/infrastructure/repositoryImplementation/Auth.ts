import { v4 } from 'uuid';
import { JwtTokenRepository } from './../../domain/repositories/jwt/jwt.js';
import { AuthRepository } from '../../domain/repositories/auth/auth.js';
import { LoginUser } from '../../domain/repositories/auth/interfaces/LoginUser.js';
import { RegistrationUser } from '../../domain/repositories/auth/interfaces/RegistrationUser.js';
import bcrypt from 'bcryptjs';
import ApiError from '../../web-api/error/index.js';
import { UserRepository } from '../../domain/repositories/user/user.js';
import { OTPRepository } from '../../domain/repositories/auth/otp.js';
import { EmailRepository } from '../../domain/repositories/auth/email.js';

export class AuthImplementation implements AuthRepository {
  constructor(
    private jwtRepository: JwtTokenRepository,
    private userRepository: UserRepository,
    private otpRepository: OTPRepository,
    private emailRepository: EmailRepository,
  ) {}
  async login(dto: LoginUser) {
    const findUser = await this.userRepository.getByField('email', dto.email);
    if (!findUser) {
      throw new Error('Incorrect email or password');
    }
    const isPasswordEqual = await bcrypt.compare(dto.password, findUser.password);
    if (!isPasswordEqual) {
      throw new Error('Incorrect email or password');
    }
    const tokens = await this.jwtRepository.generateTokens(findUser);
    await this.jwtRepository.saveToken(findUser.id, tokens.refreshToken);
    const { password, ...userWithoutPassword } = findUser;
    return { tokens, user: userWithoutPassword };
  }
  async registration(dto: RegistrationUser) {
    try {
      const findUser = await this.userRepository.getByField('email', dto.email);

      if (findUser) {
        throw new Error('User already exist');
      }
      const hashPassword = bcrypt.hashSync(dto.password, 6);
      const activationLink = v4();
      await this.userRepository.create({
        ...dto,
        activationLink,
        password: hashPassword,
      });
      await this.emailRepository.sendActivationEmail(activationLink, dto.email);
    } catch (error: any) {
      throw new Error(error.message);
    }
    return 'Create';
  }
  async logout(userId: number, refreshToken: string) {
    await this.jwtRepository.removeToken(refreshToken);
    await this.userRepository.update(userId, { isOtpVerified: false });
    await this.otpRepository.deleteOTPToken(userId);
    return 'Logout';
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorize();
    }
    const userData = await this.jwtRepository.validateRefreshToken(refreshToken);

    const tokenFromDb = await this.jwtRepository.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorize();
    }
    const user = await this.userRepository.get(userData.id);
    if (user) {
      const tokens = await this.jwtRepository.generateTokens({
        ...user,
      });
      await this.jwtRepository.saveToken(user.id, tokens.refreshToken);
      const { password, ...userWithoutPassword } = user;
      return {
        tokens,
        user: userWithoutPassword,
      };
    }
    throw ApiError.notFound();
  }
}
