import { User } from "../../entities/user.js";
import { LoginUser } from "./interfaces/LoginUser.js";
import { RegistrationUser } from "./interfaces/RegistrationUser.js";

export interface AuthRepository {
  login(dto: LoginUser): Promise<
    { user: Omit<User, "password"> } & {
      tokens: { accessToken: string; refreshToken: string };
    }
  >;
  registration(dto: RegistrationUser): Promise<string>;
  logout(refreshToken: string): Promise<string>;
  refresh(refreshToken: string): Promise<
    { user: Omit<User, "password"> } & {
      tokens: { accessToken: string; refreshToken: string };
    }
  >;
}
