"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchTranscription, fetchTranscriptionJobs } from "./transcription";
import Transcription from "@/components/Transcription";
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

const UploadPage = () => {
  const [link, setLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [keypoints, setKeypoints] = useState([]);
  const [timestamp, setTimestamp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    // Create script element and set attributes
    let script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    // Add script to document body
    document.body.appendChild(script);

    // Clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      if (videoId !== "") {
        playerRef.current = new window.YT.Player("player", {
          videoId: videoId,
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    };
  }, [videoId]);

  useEffect(() => {
    // Load the iframe API if the videoId has changed
    if (videoId !== "") {
      window.onYouTubeIframeAPIReady();
    }
  }, [videoId]);

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  const loadVideo = async () => {
    const id = link.split("v=")[1];
    const ampersandPosition = id.indexOf("&");
    if (ampersandPosition != -1) {
      setVideoId(id.substring(0, ampersandPosition));
    } else {
      setVideoId(id);
    }
    const yt_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "bad key";
    console.log("youtube api key:", yt_key);
    //TODO: MOVE YOUTUBE API KEY TO BACKEND
    // Retrieve video details from YouTube Data API
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${yt_key}&part=snippet`
    );
    console.log(response);
    if (response.data.items.length > 0) {
      const videoDetails = response.data.items[0].snippet;
      setTitle(videoDetails.title);

      // Category fetching
      const categoryResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videoCategories?id=${videoDetails.categoryId}&key=${yt_key}&part=snippet`
      );
      if (categoryResponse.data.items.length > 0) {
        setCategory(categoryResponse.data.items[0].snippet.title);
      }

      setDescription(videoDetails.description);
      setTags(videoDetails.tags.join(", "));
    }

    try {
      // const jobsRes = await axios.get("/transcription");
      // console.log(jobsRes.data);
      // const transcriptionJob = await axios.post("/transcription", {
      //   urlToTranscribe: link,
      // });
      // console.log(transcriptionJob.data);
      // const transcriptionRes = await axios.post("/transcription", {
      //   jobId: jobsRes.data[0].id,
      // });
      // console.log(transcriptionRes.data);
      // setTranscription(
      //   transcriptionRes.data.transcriptObject.monologues as any
      // );
    } catch (error) {
      console.error("Error fetching transcription:", error);
    }
    // // Fetch Transcription
    // //use transcription file from serverside?
    // const jobs = await fetchTranscriptionJobs();
    // console.log(jobs);
    // const transcription = await fetchTranscription(jobs[0].id);
    // console.log(transcription);
    // setTranscription(transcription.transcriptObject.monologues as any);
  };

  const seekToTimestamp = (timestamp) => {
    playerRef.current.seekTo(timestamp, "seconds");
  };

  const seekForward20Seconds = () => {
    let currentTime = playerRef.current.getCurrentTime();
    console.log("currentTime: " + currentTime);
    if (currentTime < 0) {
      currentTime = 0;
    }
    playerRef.current.seekTo(currentTime + 20, "seconds");
  };

  const seekBackward20Seconds = () => {
    let currentTime = playerRef.current.getCurrentTime();
    if (currentTime < 0) {
      currentTime = 0;
    }
    playerRef.current.seekTo(currentTime - 20, "seconds");
  };

  const submitVideo = async () => {
    setLoading(true);
    setMessage("");
    const videoData = {
      videoId,
      link,
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      category,
      keypoints,
    };

    try {
      // Make a POST request to your server's API endpoint for uploading videos
      const response = await axios.post("/api/videos", videoData);
      setMessage("Video uploaded successfully!");
    } catch (error) {
      setMessage("An error occurred while uploading the video.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addKeypoint = () => {
    setKeypoints([
      ...keypoints,
      { timestamp: playerRef.current.getCurrentTime(), description },
    ]);
    setTimestamp(playerRef.current.getCurrentTime());
  };

  return (
    <div className="upload-page p-4 bg-gray-800">
      <h1>Debate Upload</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Video URL</label>
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="px-3 py-2 placeholder-gray-500 text-black bg-white rounded-md focus:outline-none focus:shadow-outline w-full"
        />
        <label className="block text-sm font-medium">Video Title</label>
        <input
          type="text"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="my-4">
          <label className="block text-sm font-medium">Video Tags</label>
          <textarea
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
            rows="3"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {tags.length > 50 && (
            <button onClick={() => alert("tags")}>Load More</button>
          )}
        </div>
        <button
          onClick={loadVideo}
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 mt-4"
        >
          Load Video
        </button>
      </div>
      <div id="player" className="mb-4"></div>
      <button
        onClick={seekForward20Seconds}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
      >
        Seek 20 Seconds Forward
      </button>
      <br />
      <button
        onClick={seekBackward20Seconds}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 mt-4"
      >
        Seek 20 Seconds Back
      </button>
      <div className="mt-4">
        <div className="my-4">
          <label className="block text-sm font-medium">Video Description</label>
          <textarea
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {description.length > 50 && (
            <button onClick={() => alert("test")}>Load More</button>
          )}
        </div>
        <div className="my-4">
          <label className="block text-sm font-medium">Video Category</label>
          <input
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button
          onClick={addKeypoint}
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 mt-4"
        >
          Add Keypoint
        </button>
        <button
          onClick={submitVideo}
          disabled={loading}
          className={`px-6 py-2 text-white rounded-md mt-4 ${
            loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-400"
          }`}
        >
          {loading ? "Uploading..." : "Submit Video"}
        </button>
        <p
          className={`text-lg ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          } mt-4`}
        >
          {message}
        </p>
        <h4 className="text-lg font-semibold mt-4">Keypoints</h4>
        <ul className="list-disc list-inside mt-2">
          {keypoints.map((keypoint, index) => (
            <li key={index} className="my-1">
              <span className="font-semibold">Timestamp: </span>{" "}
              {keypoint.timestamp}
              <span className="font-semibold ml-4">Description: </span>{" "}
              {keypoint.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="transcription">
        {transcription.map((entry, index) => (
          <div key={index}>
            <span onClick={() => seekToTimestamp(entry.timestamp)}>
              {entry.timestamp}
            </span>
            <p>{entry.text}</p>
          </div>
        ))}
        <Transcription />
      </div>
    </div>
  );
};

export default UploadPage;
