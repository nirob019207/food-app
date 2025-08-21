import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const loginUrl = new URL("/login", request.url);

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // If token expired, redirect to login
    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(loginUrl);
    }

    const { pathname } = request.nextUrl;

    // ✅ Protect admin routes
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/category") ||
      pathname.startsWith("/product") ||
      pathname.startsWith("/allOrder")
    ) {
      if (decoded.role !== "ADMIN" && decoded.role !== "SUPERADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // ✅ Protect user-only routes
    if (pathname.startsWith("/myorder")) {
      if (decoded.role !== "USER") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ✅ Apply middleware only on protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/category/:path*",
    "/product/:path*",
    "/allOrder/:path*",
    "/myorder/:path*",
  ],
};
