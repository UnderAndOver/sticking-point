"use client";
import { createParagraphPlugin, createHighlightPlugin } from "@udecode/plate";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { Plate, createPlugins } from "@udecode/plate-common";
import { SetStateAction, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const plugins = createPlugins([
  createParagraphPlugin({
    component: ParagraphElement,
  }),
]);

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

export default function Transcription({
  videoUrl = "https://www.youtube.com/watch?v=yDiWaD7juZM",
  initialTranscript = getTranscript(),
}) {
  const playerRef = useRef(null);
  videoUrl = DEMO_MEDIA_URL;
  const [currentTime, setCurrentTime] = useState(0);

  const handleWordClick = (word: { start: SetStateAction<number> }) => {
    console.log("clicked on word:");
    console.log(word);
    setCurrentTime(word.start);
    if (playerRef != undefined && playerRef.current != undefined) {
      playerRef.current.seekTo(word.start);
    }
  };

  const editableProps = {
    spellCheck: false,
    autoFocus: false,
    renderElement: ({
      attributes,
      children,
      element,
    }: {
      attributes: any;
      children: any;
      element: any;
    }) => {
      if (element.type === "word") {
        return (
          <span
            {...attributes}
            onClick={() => handleWordClick(element)}
            style={{ cursor: "pointer" }}
          >
            {children}
          </span>
        );
      }

      if (element.type === "paragraph") {
        return (
          <p {...attributes}>
            {element.speaker}: {children}
          </p>
        );
      }

      return <p {...attributes}>{children}</p>;
    },
  };

  return (
    <Dynamic>
      <div style={{ display: "flex" }}>
        <div>
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            controls={true}
            progressInterval={1000}
            onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
          />
          <div className="time">Current Time:{currentTime}</div>
        </div>
        <div>
          <Plate
            editableProps={editableProps}
            initialValue={initialTranscript}
            plugins={plugins}
            readOnly={true}
          />
        </div>
      </div>
    </Dynamic>
  );
}

const DEMO_MEDIA_URL = "presidential-debate-2-yDiWaD7juZM.mp4";
import DEMO_TRANSCRIPT from "@/../example.json";

type RevFormat = {
  speakers: Array<{ id: number; name: string }>;
  monologues: Array<{
    id: number;
    speaker: number;
    speaker_name: string;
    elements: Array<{
      type: string;
      value: string;
      timestamp?: string;
      end_timestamp?: string;
    }>;
  }>;
};

type SlateFormat = {
  words: Array<{ end: number; start: number; text: string }>;
  paragraphs: Array<{ speaker: string; start: number; end: number }>;
};

function convertJsonFormat(original: RevFormat): SlateFormat {
  const speakerMap = new Map(original.speakers.map((s) => [s.id, s.name]));
  let words: SlateFormat["words"] = [];
  let paragraphs: SlateFormat["paragraphs"] = [];

  for (let monologue of original.monologues) {
    let paragraphStart: number | null = null;

    for (let element of monologue.elements) {
      if (element.type !== "text" || !element.value.trim()) continue;
      if (element.timestamp && element.end_timestamp) {
        const start =
          Date.UTC(
            1970,
            0,
            1,
            ...element.timestamp
              .split(",")
              .flatMap((v, i) => (i === 0 ? v.split(":") : v))
              .map(Number)
          ) / 1000;
        const end =
          Date.UTC(
            1970,
            0,
            1,
            ...element.end_timestamp
              .split(",")
              .flatMap((v, i) => (i === 0 ? v.split(":") : v))
              .map(Number)
          ) / 1000;
        if (paragraphStart === null) paragraphStart = start;

        words.push({ start, end, text: element.value.trim() });
      }

      if (paragraphStart !== null) {
        const paragraphEnd = words[words.length - 1].end;
        paragraphs.push({
          speaker: speakerMap.get(monologue.speaker) || "Unknown",
          start: paragraphStart,
          end: paragraphEnd,
        });
      }
    }
  }

  return { words, paragraphs };
}

function convertJsonFormatNew(original: RevFormat): any {
  const speakerMap = new Map(original.speakers.map((s) => [s.id, s.name]));
  let paragraphs = [];

  for (let monologue of original.monologues) {
    let words = [];

    for (let element of monologue.elements) {
      if (element.type !== "text" || !element.value.trim()) continue;

      if (element.timestamp && element.end_timestamp) {
        const start = timestampConvert(element.timestamp);
        const end = timestampConvert(element.end_timestamp);

        words.push({
          type: "word",
          start,
          end,
          children: [{ text: element.value.trim() + " " }],
        });
      }
    }

    if (words.length) {
      paragraphs.push({
        type: "paragraph",
        speaker: speakerMap.get(monologue.speaker) || "Unknown",
        children: words,
      });
    }
  }

  return paragraphs;
}

function timestampConvert(timestamp: string) {
  return (
    Date.UTC(
      1970,
      0,
      1,
      ...timestamp
        .split(",")
        .flatMap((v, i) => (i === 0 ? v.split(":") : v))
        .map(Number)
    ) / 1000
  );
}

function getTranscript() {
  let transcript = convertJsonFormatNew(DEMO_TRANSCRIPT);
  return transcript;
}
