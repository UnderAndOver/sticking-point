import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const excludedPaths = ["_next", "static", "", "logo.png", "favicon.ico"]; // add more paths here if needed

  // Get the first segment of the path
  const firstSegment = req.nextUrl.pathname.split("/")[1];

  // Check if the first segment is an excluded path
  if (excludedPaths.includes(firstSegment) || process.env.DEV_MODE == "true") {
    // If it is, do nothing and let the request continue
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  // If the first segment is not an excluded path, redirect to '/'
  url.pathname = "/";
  return NextResponse.redirect(url.toString());
}
