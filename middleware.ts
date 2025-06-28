import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = "my-secret-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
