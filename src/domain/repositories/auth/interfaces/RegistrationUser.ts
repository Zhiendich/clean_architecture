import { User } from "../../../entities/user.js";

export interface RegistrationUser
  extends Omit<
    User,
    "id" | "isOtpVerified" | "isTwoFactorEnabled" | "isEmailVerified"
  > {}
