import React from "react";
import { DataTable } from "./data-table";
import { Video, columns } from "./columns";
import { zocker } from "zocker";
import { z } from "zod";

async function getData(): Promise<Video[]> {
  const schema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    uploader: z.string().max(50),
    date: z.date(),
    status: z.enum(["pending", "processing", "success", "failed"]),
  });
  const mockData: Video[] = Array.from({ length: 15 }, () =>
    zocker(schema).generate()
  );
  return mockData;
}

export default async function Debates() {
  const data = await getData();
  return (
    <div>
      <h1>Debates</h1>
      <DataTable columns={columns} data={data} />
      <p>Go here to upload debates</p>
      <a href="/debates/upload">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </a>
    </div>
  );
}

const Page = () => <div>Debates</div>;
