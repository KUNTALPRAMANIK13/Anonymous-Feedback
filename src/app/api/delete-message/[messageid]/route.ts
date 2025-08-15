import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/models/Messages.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
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

  try {
    const updatedResult = await MessageModel.deleteOne({ _id: messageId });
    if (updatedResult.deletedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or it may be deleted",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
