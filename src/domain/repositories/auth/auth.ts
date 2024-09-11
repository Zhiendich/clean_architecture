import { User } from "../../entities/user.js";
import { LoginUser } from "./interfaces/LoginUser.js";
import { RegistrationUser } from "./interfaces/RegistrationUser.js";

export interface AuthRepository {
  login(dto: LoginUser): Promise<User>;
  registration(dto: RegistrationUser): Promise<string>;
}
