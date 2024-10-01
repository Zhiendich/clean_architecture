export interface EmailRepository {
  sendActivationEmail(
    activationLink: string,
    recipient: string
  ): Promise<string>;
  activatEmail(activationLink: string): Promise<boolean>;
}
