"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./(components)/data-table";
import { zocker } from "zocker";
import { z } from "zod";

interface Video {
  id: string;
  name: string;
  url: string;
  uploader: string;
  date: Date;
  status: "pending" | "processing" | "success" | "failed";
}

const schema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  uploader: z.string().max(50),
  date: z.date(),
  status: z.enum(["pending", "processing", "success", "failed"]),
});

function getData(): Promise<Video[]> {
  const mockData: Video[] = Array.from(
    { length: 15 },
    () => zocker(schema).generate() as Video
  );
  return Promise.resolve(mockData);
}

export default function Debates() {
  const [data, setData] = useState<Video[]>([]);

  useEffect(() => {
    getData().then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <div>
      <h1>Debates</h1>
      <DataTable data={data} />
      <p>Go here to upload debates</p>
      <a href="/debates/upload">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </a>
    </div>
  );
}
