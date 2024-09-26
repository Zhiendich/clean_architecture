import { UserRepository } from "../../domain/repositories/user/user.js";

export class GetUser {
  constructor(private userRepository: UserRepository) {}
  async execute(id: number) {
    return await this.userRepository.get(id);
  }
}
