import { User } from "../../entities/user.js";
import { RegistrationUser } from "../auth/interfaces/RegistrationUser.js";

export interface UserRepository {
  get(id: number): Promise<User>;
  getByField(field: keyof User, value: string | number): Promise<User>;
  update(id: number, data: Partial<User>): Promise<number[]>;
  findAndUpdate(id: number, data: Partial<User>): Promise<User>;
  create(user: RegistrationUser): Promise<User>;
}
