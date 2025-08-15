import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    console.log("Testing Gemini API...");

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "API key missing",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Simple test prompt
    const result = await model.generateContent("Say hello");
    const text = result.response?.text?.() ?? "";

    return NextResponse.json({
      success: true,
      message: "Gemini API is working",
      response: text,
      apiKeyPresent: true,
    });
  } catch (error: any) {
    console.error("Gemini test error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Test failed",
        error: error?.toString(),
      },
      { status: 500 }
    );
  }
}
