import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

// GET /recruiter?key=YOUR_SECRET
// Auto-logs into a demo account for recruiters without password/OTP.
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key") || "";
    const accessKey = process.env.RECRUITER_ACCESS_KEY || "";

    if (!accessKey) {
      return NextResponse.json(
        { success: false, message: "Recruiter access is not configured." },
        { status: 501 }
      );
    }
    if (key !== accessKey) {
      return NextResponse.json(
        { success: false, message: "Invalid access key." },
        { status: 403 }
      );
    }

    await dbConnect();

    const username = process.env.RECRUITER_DEMO_USERNAME?.trim() || "demo";
    const email =
      process.env.RECRUITER_DEMO_EMAIL?.trim() || "demo@example.com";

    // Ensure a demo user exists
    let userDoc = await UserModel.findOne({ username });
    if (!userDoc) {
      const passwordPlain = "Aa1!demo123";
      const passwordHash = await bcrypt.hash(passwordPlain, 10);
      const now = new Date();
      userDoc = await UserModel.create({
        username,
        email,
        password: passwordHash,
        verifyCode: "000000",
        verifyCodeExpiry: new Date(now.getTime() + 1000 * 60 * 60),
        isVerified: true,
        isAcceptMessage: true,
        messages: [],
      });
    }

    const user: any =
      typeof (userDoc as any).toObject === "function"
        ? (userDoc as any).toObject()
        : userDoc;

    // Build NextAuth JWT token compatible with session callback mapping
    const tokenPayload: any = {
      name: user.username,
      email: user.email,
      sub: String(user._id),
      _id: String(user._id),
      isVerified: true,
      isAcceptingMessages: !!user.isAcceptMessage,
      username: user.username,
    };

    if (!process.env.NEXTAUTH_SECRET) {
      return NextResponse.json(
        { success: false, message: "NEXTAUTH_SECRET is not set." },
        { status: 500 }
      );
    }

    const sessionToken = await encode({
      token: tokenPayload,
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    // Set cookie name used by NextAuth (dev vs prod). Setting both is safe.
    response.cookies.set("next-auth.session-token", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false, // fallback for local/dev
      maxAge: 30 * 24 * 60 * 60,
    });
    response.cookies.set("__Secure-next-auth.session-token", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Recruiter login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create recruiter session",
      },
      { status: 500 }
    );
  }
}
