import { UserRepository } from "../../domain/repositories/user/user.js";

export class GetUser {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string) {
    return await this.userRepository.get(id);
  }
}
