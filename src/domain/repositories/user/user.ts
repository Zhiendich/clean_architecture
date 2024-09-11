import { User } from "../../entities/user.js";

export interface UserRepository {
  get(id: string): User;
}
