// Load environment variables manually
require("dotenv").config();

// Simple test to verify environment variables and Resend setup
console.log("=== Environment Check ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY?.length || 0);
console.log(
  "RESEND_API_KEY first 10 chars:",
  process.env.RESEND_API_KEY?.substring(0, 10) || "undefined"
);

// Test the Resend import
try {
  const { Resend } = require("resend");
  console.log("✅ Resend import successful");

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("✅ Resend instance created");
  } else {
    console.log("❌ Cannot create Resend instance - API key missing");
  }
} catch (error) {
  console.error("❌ Error with Resend:", error.message);
}
