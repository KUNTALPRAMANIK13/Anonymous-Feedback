import "next-auth";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

// Extended User interface
export interface ExtendedUser extends DefaultUser {
  _id: string;
  username: string;
  isVerified: boolean;
  isAcceptMessage: boolean;
}

// Extended Session interface
export interface ExtendedSession extends DefaultSession {
  user: {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  } & DefaultSession["user"];
}

// Extended JWT interface
export interface ExtendedJWT extends DefaultJWT {
  _id: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session extends ExtendedSession {}
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {}
}
