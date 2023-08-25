import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const excludedPaths = ["_next", "static", "", "logo.png", "favicon.ico"]; // add more paths here if needed

  // Get the first segment of the path
  const firstSegment = req.nextUrl.pathname.split("/")[1];

  // Check if the first segment is an excluded path
  if (excludedPaths.includes(firstSegment) || process.env.DEV_MODE == "true") {
    //USER AUTH FOR DEV MODE ONLY FOR NOW
    if (process.env.DEV_MODE == "true") {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // if user is signed in and the current path is / redirect the user to /account
      if (user && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/account", req.url));
      }

      // if user is not signed in and the current path is not / redirect the user to /
      if (
        !user &&
        req.nextUrl.pathname !== "/auth" &&
        !excludedPaths.includes(firstSegment)
      ) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    return res;
  }

  const url = req.nextUrl.clone();
  // If the first segment is not an excluded path, redirect to '/'
  url.pathname = "/";
  return NextResponse.redirect(url.toString());
}

// export const config = {
//   matcher: ["/", "/account"],
// };
