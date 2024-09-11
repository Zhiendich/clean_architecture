import { IsString, IsEmail } from "class-validator";
import { RegistrationUser } from "../../../domain/repositories/auth/interfaces/RegistrationUser.js";

export class RegisterUserDto implements RegistrationUser {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
  @IsString()
  name!: string;
}
