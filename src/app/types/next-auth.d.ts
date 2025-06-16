import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      user_name: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    user_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      user_name: string;
    };
  }
}
