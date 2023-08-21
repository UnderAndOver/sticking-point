"use client";
import React, { forwardRef, Ref } from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  url: string;
};

const VideoPlayer = forwardRef<ReactPlayer, VideoPlayerProps>((props, ref) => {
  return (
    <div className="relative overflow-hidden w-full pb-[56.25%]">
      <ReactPlayer
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        ref={ref as Ref<ReactPlayer>}
        url={props.url}
        controls={true}
        progressInterval={1000}
      />
    </div>
  );
});
VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
