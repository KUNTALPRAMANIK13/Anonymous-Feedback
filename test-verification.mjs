import { sendVerificationEmail } from "../src/helpers/sendVerificationEmail.js";

async function testEmail() {
  console.log("Testing email sending...");

  const result = await sendVerificationEmail(
    "busybabbage6@deliveryotter.com", // Replace with your actual email
    "testuser",
    "123456"
  );

  console.log("Result:", result);
}

testEmail().catch(console.error);
