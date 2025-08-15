import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    // Check if username already exists (verified or not)
    const existingUserByUsername = await UserModel.findOne({
      username,
    });
    if (existingUserByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
    });
    const verifyUserCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
          { success: false, message: "The user already exists" },
          { status: 500 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hashedPassword;
        existingUserVerifiedByEmail.verifyCode = verifyUserCode;
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000
        );
        await existingUserVerifiedByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 9);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyUserCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    // Send verification email
    console.log("Attempting to send verification email to:", email);
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyUserCode
    );

    console.log("Email response:", emailResponse);

    if (!emailResponse.success) {
      console.error(
        "Failed to send verification email:",
        emailResponse.message
      );
      // Still return success since user is created, but inform about email issue
      return Response.json(
        {
          success: true,
          message:
            "User registered successfully, but verification email failed to send. Please try again or contact support.",
          emailError: emailResponse.message,
        },
        { status: 201 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message:
            "User registered successfully. Please check your email for verification code.",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("=== Sign-up Error ===");
    console.error("Error type:", typeof error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error("Full error:", error);

    // Handle specific MongoDB duplicate key error
    if (
      error instanceof Error &&
      error.message.includes("E11000 duplicate key error")
    ) {
      if (error.message.includes("username_1")) {
        return Response.json(
          {
            success: false,
            message:
              "Username is already taken. Please choose a different username.",
          },
          { status: 400 }
        );
      }
      if (error.message.includes("email_1")) {
        return Response.json(
          {
            success: false,
            message:
              "Email is already registered. Please use a different email or try signing in.",
          },
          { status: 400 }
        );
      }
    }

    return Response.json(
      {
        success: false,
        message: "Error registering user. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
