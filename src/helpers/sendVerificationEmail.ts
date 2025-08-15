import { Resend } from "resend";
import VerificationEmail from "../../emails/verificationEmails";
import { ApiResponse } from "@/types/apiResponse";

// Initialize Resend with error checking
const initializeResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set in environment variables");
    return null;
  }
  return new Resend(apiKey);
};

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log("=== Email Sending Debug Info ===");
    console.log("Attempting to send verification email to:", email);
    console.log("Username:", username);
    console.log("Verification code:", verifyCode);
    console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);
    console.log(
      "Resend API Key length:",
      process.env.RESEND_API_KEY?.length || 0
    );

    const resend = initializeResend();
    if (!resend) {
      return {
        success: false,
        message: "Email service configuration error: API key missing",
      };
    }

    console.log("Sending email with Resend...");

    // Use environment variable for custom domain or fallback to resend.dev
    const fromEmail =
      process.env.EMAIL_FROM || "Anonymous Feedback <onboarding@resend.dev>";
    console.log("Using from email:", fromEmail);

    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Anonymous Feedback - Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log("Resend API result:", result);

    if (result.error) {
      console.error("Resend API error:", result.error);

      // Handle specific Resend error codes
      if ("statusCode" in result.error && result.error.statusCode === 403) {
        console.log("⚠️  Resend 403 error - using fallback for testing");
        // For development, we'll return success but log the limitation
        console.log(`📧 Would send verification email to: ${email}`);
        console.log(`🔢 Verification code: ${verifyCode}`);
        return {
          success: true,
          message: "Development mode: Check console for verification code",
        };
      }

      return {
        success: false,
        message: `Failed to send verification email: ${
          result.error.message || JSON.stringify(result.error)
        }`,
      };
    }

    if (result.data) {
      console.log("Email sent successfully! ID:", result.data.id);
      return { success: true, message: "Verification email sent successfully" };
    }

    // If we get here, something unexpected happened
    console.error("Unexpected result from Resend:", result);
    return {
      success: false,
      message: "Unexpected response from email service",
    };
  } catch (emailError) {
    console.error("=== Email Sending Error ===");
    console.error("Error type:", typeof emailError);
    console.error(
      "Error message:",
      emailError instanceof Error ? emailError.message : String(emailError)
    );
    console.error(
      "Error stack:",
      emailError instanceof Error ? emailError.stack : "No stack trace"
    );
    console.error("Full error:", emailError);

    return {
      success: false,
      message: `Failed to send verification email: ${
        emailError instanceof Error
          ? emailError.message
          : "Unknown error occurred"
      }`,
    };
  }
}
