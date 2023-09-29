import { headers } from "next/headers";

export default async function APIFromServer() {
  const resp = await fetch("http://localhost:3000/api/whoAmI", {
    method: "GET",
    headers: headers(),
  }).then((res) => res.json());

  return (
    <>
      <h1>API Test</h1>
      <p>{resp.name}</p>
    </>
  );
}
