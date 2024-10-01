import { EmailRepository } from "../../domain/repositories/auth/email.js";

export class SendActivationEmail {
  constructor(private emailRepository: EmailRepository) {}
  async execute(activationLink: string, recipient: string) {
    return await this.emailRepository.sendActivationEmail(
      activationLink,
      recipient
    );
  }
}
