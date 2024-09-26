export abstract class User {
  constructor(
    public readonly id: number,
    public name: string,
    public password: string,
    public email: string,
    public isOtpVerified: boolean,
    public isTwoFactorEnabled: boolean
  ) {}
}
