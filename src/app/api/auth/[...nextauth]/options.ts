import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your account first before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password ");
          }
        } catch (error: any) {
          const message = error?.message ?? "Authentication failed";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token._id = (user as any)._id?.toString();
        token.isVerified = (user as any).isVerified;
        // map DB field (isAcceptMessage) to token/session field (isAcceptingMessages)
        token.isAcceptingMessages = (user as any).isAcceptMessage;
        token.username = (user as any).username;
      }
      return token;
    },
  async session({ session, token }: any) {
      if (token) {
        (session.user as any)._id = token._id as string | undefined;
        (session.user as any).isVerified = token.isVerified as boolean | undefined;
        (session.user as any).isAcceptingMessages = token.isAcceptingMessages as boolean | undefined;
        (session.user as any).username = token.username as string | undefined;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
