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
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        await dbConnect();

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          isAcceptMessage: user.isAcceptMessage,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any)['_id'] = user.id;
        (token as any)['username'] = user.username;
        (token as any)['isVerified'] = user.isVerified;
        (token as any)['isAcceptingMessages'] = user.isAcceptMessage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any)['_id'] = (token as any)['_id'] as string;
        (session.user as any)['username'] = (token as any)['username'] as string;
        (session.user as any)['isVerified'] = (token as any)['isVerified'] as boolean;
        (session.user as any)['isAcceptingMessages'] = (token as any)['isAcceptingMessages'] as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
  pages: {
    signIn: "/sign-in",
  },
};
