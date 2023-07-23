import Transcription from "@/components/Transcription";
import React from "react";

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
      <div>TEST TRANSCRIPTION</div>
      <Transcription />
    </div>
  );
}

const Page = () => <div>Debates</div>;
//add a button to go to the debates/upload page
