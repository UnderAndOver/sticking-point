"use client";
import { useState } from "react";

export default function WhoAmIButton({
  whoAmIAction,
}: {
  whoAmIAction: () => Promise<string>;
}) {
  const [whoAmI, setWhoAmI] = useState("");
  return (
    <>
      <button
        onClick={async () => {
          setWhoAmI(await whoAmIAction());
        }}
      >
        Who Am I?
      </button>
      {whoAmI && <p>{whoAmI}</p>}
    </>
  );
}
