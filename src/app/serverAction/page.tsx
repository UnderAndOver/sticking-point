import { getServerSession } from "next-auth";
import WhoAmIButton from "./WhoAmIButton";
import authOptions from "../api/auth/[...nextauth]/authOptions";
export default async function ServerActionPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession(authOptions);
    return session?.user?.name || "Not signed in";
  };
  return (
    <>
      <h1>Server Action</h1>
      <WhoAmIButton whoAmIAction={whoAmI} />
    </>
  );
}
