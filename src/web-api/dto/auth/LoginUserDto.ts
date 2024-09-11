import { LoginUser } from "../../../domain/repositories/auth/interfaces/LoginUser.js";
import { IsString, IsEmail } from "class-validator";

export class LoginUserDto implements LoginUser {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}
