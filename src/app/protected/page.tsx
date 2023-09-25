import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }
  return (
    <>
      <h1>Protected Page</h1>
      <p>Hi {session.user.name}</p>
    </>
  );
}
