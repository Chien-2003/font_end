import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const result = await res.json();

        if (res.ok && result?.data) {
          const user = result.data;
          return {
            id: Number(user.id),
            email: user.email,
            user_name: user.user_name,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: Number(user.id),
          email: user.email,
          user_name: (user as any).user_name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
