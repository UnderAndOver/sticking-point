import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
// import { accounts, sessions, users, verificationTokens } from "@/db/schema";
// import { PgTableFn, pgTable } from "drizzle-orm/pg-core";
// import { InferSelectModel, eq } from "drizzle-orm";
// const pgTableHijack: PgTableFn = (name, columns, extraConfig) => {
//   switch (name) {
//     case "user":
//       return users;
//     case "account":
//       return accounts;
//     case "session":
//       return sessions;
//     case "verificationToken":
//       return verificationTokens;
//     default:
//       return pgTable(name, columns, extraConfig);
//   }
// };

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
