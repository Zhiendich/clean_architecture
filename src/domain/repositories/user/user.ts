import { User } from "../../entities/user.js";

export interface UserRepository {
  get(id: string): Promise<Omit<User, "password">>;
}
