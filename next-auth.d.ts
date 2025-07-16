import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    provider?: string;
  }

  interface User {
    provider?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
  }
}
