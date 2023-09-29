"use client";
import { useState, useEffect } from "react";

export default function APITestPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/whoAmI")
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, []);

  return (
    <>
      <h1>API Test</h1>
      <p>{name}</p>
    </>
  );
}
