import dotenv from "dotenv";
import { EmailRepository } from "../../domain/repositories/auth/email.js";
import nodeMailer, { TransportOptions } from "nodemailer";
import google from "googleapis";
import { UserRepository } from "../../domain/repositories/user/user.js";
const OAuth2 = google.Auth.OAuth2Client;
dotenv.config();

export class EmailImplementation implements EmailRepository {
  transporter: any;
  accessToken: any;
  transportOptions = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: "",
    },
  };

  constructor(private userRepository: UserRepository) {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    const OAuth2_client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    OAuth2_client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessTokenResponse = await OAuth2_client.getAccessToken();
    this.accessToken = accessTokenResponse?.token;

    this.transportOptions.auth.accessToken = this.accessToken;

    this.transporter = nodeMailer.createTransport(
      this.transportOptions as TransportOptions
    );
  }

  async sendActivationEmail(
    activationLink: string,
    recipient: string
  ): Promise<string> {
    await this.transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: recipient,
      subject: "Email activation for my application",
      html: `<div>
       <h1>Dear ${recipient}, for email activation you need to click the link down below :</h1>
         <a href = "${process.env.API_URL}/api/email/activateEmail/${activationLink}">${activationLink}</a>
        <div>`,
    });
    return "Sended";
  }
  async activatEmail(activationLink: string): Promise<boolean> {
    const find = await this.userRepository.getByField(
      "activationLink",
      activationLink
    );
    if (find) {
      await this.userRepository.update(find.id, { isEmailVerified: true });
      return true;
    }
    return false;
  }
}
