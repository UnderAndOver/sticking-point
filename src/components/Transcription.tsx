"use client";
import { createParagraphPlugin } from "@udecode/plate";
import { Plate, createPlugins } from "@udecode/plate-common";
import ReactPlayer from "react-player";

const plugins = createPlugins([createParagraphPlugin()]);

export default function Transcription({
  videoUrl = "https://www.youtube.com/watch?v=yDiWaD7juZM",
  initialTranscript = getTranscript(),
}) {
  videoUrl = DEMO_MEDIA_URL;
  const [currentTime, setCurrentTime] = useState(0);

  const handleWordClick = (word: { start: SetStateAction<number> }) => {
    setCurrentTime(word.start);
  };

  const editableProps = {
    spellCheck: false,
    autoFocus: false,
    placeholder: "Start typing...",
    style: { outline: "none" },
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
    <div style={{ display: "flex" }}>
      <div>
        <ReactPlayer
          url={videoUrl}
          controls={true}
          progressInterval={1000}
          onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        />
      </div>
      <div>
        <Plate
          editableProps={editableProps}
          initialValue={initialTranscript}
          plugins={plugins}
        />
      </div>
    </div>
  );
}

const DEMO_MEDIA_URL = "presidential-debate-2-yDiWaD7juZM.mp4";
import DEMO_TRANSCRIPT from "@/../example.json";
import { SetStateAction, useState } from "react";
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

        words.push({
          type: "word",
          start,
          end,
          children: [{ text: element.value.trim() }],
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

function getTranscript() {
  let transcript = convertJsonFormatNew(DEMO_TRANSCRIPT);
  return transcript;
}
