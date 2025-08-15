import { resend } from "@/lib/resend";
import forgotPasswordEmail from "../../emails/forgotPasswordEmails";

export async function sendForgotPasswordEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<{ success: boolean; message: string }> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification code ",
      react: forgotPasswordEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email sent Successfully " };
  } catch (emailError) {
    return { success: false, message: "Failed to send verification email" };
  }
}
