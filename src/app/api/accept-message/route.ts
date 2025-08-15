import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

// Avoid importing strict NextAuth User type; we'll narrow session.user after guards

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const sessionUser = session.user as { _id?: string };
  const userId = sessionUser._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptMessage: acceptMessages,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user to accept  message ",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "message acceptance status updated successfully",
          isAcceptingMessages: Boolean(updatedUser.isAcceptMessage),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "failed to update message status ",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const sessionUser = session.user as { _id?: string };
  const foundUser = await UserModel.findById(sessionUser._id);
  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          success: true,
          isAcceptingMessages: Boolean(foundUser.isAcceptMessage),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }

  //   const { acceptMessages } = await request.json();
}
