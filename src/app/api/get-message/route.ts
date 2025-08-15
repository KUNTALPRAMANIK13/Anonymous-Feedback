import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

// Avoid strict NextAuth User typing; we'll narrow session.user after guard
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    const session = await getServerSession(authOptions);
    console.log(
      "Session retrieved:",
      session ? "Session exists" : "No session"
    );

    if (!session || !session.user) {
      console.log("Authentication failed - no session or user");
      return Response.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }
    const sessionUser = session.user as { _id?: string };

    console.log("User ID from session:", sessionUser._id);

    if (!sessionUser._id) {
      console.log("User ID is missing from session");
      return Response.json(
        {
          success: false,
          message: "User ID not found in session",
        },
        { status: 400 }
      );
    }

    // Find user and populate messages, sorted by creation date
    const userWithMessages = await UserModel.findById(sessionUser._id)
      .select("messages")
      .lean();

    console.log("User found:", userWithMessages ? "Yes" : "No");

    if (!userWithMessages) {
      console.log("User not found in database");
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Sort messages by creation date (newest first)
    const messages = userWithMessages.messages || [];
    messages.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    console.log("Messages count:", messages.length);

    return Response.json(
      {
        success: true,
        messages: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching messages:", error);
    return Response.json(
      {
        success: false,
        message: "Error while fetching messages",
      },
      { status: 500 }
    );
  }
}
