import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { google } from "@lucia-auth/oauth/providers";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "./db";
import { cache } from "react";
import * as context from "next/headers";

export const auth = lucia({
  adapter: pg(pool, {
    user: "auth_user",
    session: "user_session",
    key: "user_key",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
});

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
  scope: ["openid", "email", "profile"],
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
