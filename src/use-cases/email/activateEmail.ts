import { EmailRepository } from "../../domain/repositories/auth/email.js";

export class ActivateEmail {
  constructor(private emailRepository: EmailRepository) {}
  async execute(activationLink: string) {
    return await this.emailRepository.activatEmail(activationLink);
  }
}
