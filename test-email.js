const { Resend } = require("resend");
require("dotenv").config();

async function testResend() {
  console.log("Testing Resend Email Service...");
  console.log("API Key exists:", !!process.env.RESEND_API_KEY);
  console.log(
    "API Key (first 10 chars):",
    process.env.RESEND_API_KEY?.substring(0, 10)
  );

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing!");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "kuntalpramanik964@gmail.com", // Using your verified email for testing
      subject: "Test Email from Anonymous Feedback",
      html: "<p>This is a test email to verify Resend is working!</p>",
    });

    if (error) {
      console.error("❌ Resend Error:", error);
    } else {
      console.log("✅ Email sent successfully!");
      console.log("Response data:", data);
    }
  } catch (error) {
    console.error("❌ Catch Error:", error.message);
  }
}

testResend();
