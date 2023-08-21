import React from "react";
import VideoWithTranscript from "@/components/VideoWithTranscript";

export default function Debates() {
  return (
    <div>
      <h1>Debates</h1>
      <p>Go here to upload debates</p>
      <a href="/debates/upload">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </a>
      <VideoWithTranscript videoUrl={undefined} transcriptData={undefined} />
    </div>
  );
}

const Page = () => <div>Debates</div>;
