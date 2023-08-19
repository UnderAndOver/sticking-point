"use client";
import { useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Transcript from "./Transcription";

const Dynamic = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return "Loading...";
  }

  return <>{children}</>;
};

function VideoWithTranscript({ videoUrl, transcriptData }) {
  const videoRef = useRef(null);
  const DEMO_MEDIA_URL = "presidential-debate-2-yDiWaD7juZM.mp4";
  videoUrl = DEMO_MEDIA_URL;
  return (
    <Dynamic>
      <div className="flex w-full">
        <div className="flex-none w-1/2 min-w-[300px] max-w-[800px]">
          <VideoPlayer url={videoUrl} ref={videoRef} />
        </div>
        <div className="flex-grow p-5 overflow-auto">
          <Transcript transcriptData={transcriptData} videoRef={videoRef} />
        </div>
      </div>
    </Dynamic>
  );
}

export default VideoWithTranscript;
