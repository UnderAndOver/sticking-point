import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const excludedPaths = [
    "/_next/",
    "/static/",
    "/",
    "/logo.png",
    "/favicon.ico",
  ]; // add more paths here if needed

  // Check if the request is for any excluded path
  if (excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If it is, do nothing and let the request continue
    return NextResponse.next();
  }

  return NextResponse.redirect("https://www.stickingpoint.co/");
}
