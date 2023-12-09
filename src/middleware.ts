// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const excludedPaths = ["_next", "static", "", "logo.png", "favicon.ico"]; // add more paths here if needed

//   // Get the first segment of the path
//   const firstSegment = req.nextUrl.pathname.split("/")[1];

//   // Check if the first segment is an excluded path
//   if (
//     excludedPaths.includes(firstSegment) ||
//     process.env.NODE_ENV !== "production"
//   ) {
//     // If it is, do nothing and let the request continue
//     return NextResponse.next();
//   }

//   const url = req.nextUrl.clone();
//   // If the first segment is not an excluded path, redirect to '/'
//   url.pathname = "/";
//   return NextResponse.redirect(url.toString());
// }
// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/debates"] };
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// export const config = { matcher: ["/debates"] };
//problematic possibly because users can create their own session-token cookie and bypass the auth since it's not verified
//maybe use jwt instead of session-token
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token");

  if (!session) {
    // return NextResponse.redirect(
    //   new URL(`/api/auth/signin?callbackUrl=${path}`, req.url)
    // );
    //redirect to home page '/'
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/debates"] };
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/debates"],
// };
