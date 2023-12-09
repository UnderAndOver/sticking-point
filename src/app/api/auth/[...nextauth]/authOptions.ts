import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Reddit from "next-auth/providers/reddit";
import Discord from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { table } from "@/db/schema";

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, table),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Reddit({
      clientId: process.env.REDDIT_CLIENT_ID ?? "",
      clientSecret: process.env.REDDIT_CLIENT_SECRET ?? "",
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
      version: "2.0",
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: { params: { scope: "identify email" } },
    }),
  ],
};

export default authOptions;
