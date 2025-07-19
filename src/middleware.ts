import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const loginUrl = new URL("/login", request.url);

  // Redirect to login if token is not present
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const user = jwtDecode(token);
    console.log(user, "user from middleware");

    // check the user role and redirect and restrict here
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(loginUrl);
  }

  // Proceed to the requested route
  return NextResponse.next();
}

// "Matching Paths"
export const config = {
  matcher: [],
};
