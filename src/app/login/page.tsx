import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (session) redirect("/");
  return (
    <>
      <h1>Sign in</h1>
      <a href="/api/auth/login/google">Sign in with Google</a>
    </>
  );
};

export default Page;
