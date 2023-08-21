"use client";
import { RefObject, useEffect, useRef } from "react";
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
export default function Transcript({
  transcriptData,
  videoRef,
}: {
  transcriptData: Paragraph[] | undefined;
  videoRef: RefObject<ReactPlayer>;
}) {
  transcriptData = transcriptData || getTranscript();

  const currentWordIndex = useRef(0);
  const words = useRef<Element[] | null>(null);
  const rafRef = useRef<number | null>(null);
  let globalWordIndex = 0;

  const seekToWord = (wordIdx: number) => {
    if (videoRef?.current && words?.current) {
      const targetTime = parseFloat(
        words.current[wordIdx].getAttribute("data-start") as string
      );
      videoRef.current.seekTo(targetTime / videoRef.current.getDuration());
      currentWordIndex.current = wordIdx;
      words.current!.forEach((word) => word.classList.remove("bg-blue-700"));
      words.current![wordIdx].className = "bg-blue-700";
    }
  };

  useEffect(() => {
    words.current = Array.from(document.querySelectorAll(".transcript span"));

    const updateHighlight = () => {
      if (!videoRef?.current || !words?.current) return;

      const currentTime = videoRef.current.getCurrentTime();

      // Traverse forward if needed
      while (
        currentWordIndex.current < words.current.length &&
        parseFloat(
          words.current[currentWordIndex.current].getAttribute(
            "data-end"
          ) as string
        ) < currentTime
      ) {
        words.current[currentWordIndex.current].classList.remove("bg-blue-700");
        currentWordIndex.current++;
      }

      // Traverse backward if needed
      while (
        currentWordIndex.current > 0 &&
        parseFloat(
          words.current[currentWordIndex.current].getAttribute(
            "data-start"
          ) as string
        ) > currentTime
      ) {
        currentWordIndex.current--;
      }

      // Highlight current word
      if (
        currentWordIndex.current < words.current.length &&
        parseFloat(
          words.current[currentWordIndex.current].getAttribute(
            "data-start"
          ) as string
        ) <= currentTime &&
        currentTime <=
          parseFloat(
            words.current[currentWordIndex.current].getAttribute(
              "data-end"
            ) as string
          )
      ) {
        words.current[currentWordIndex.current].className = "bg-blue-700";
      }

      rafRef.current = requestAnimationFrame(updateHighlight);
    };

    rafRef.current = requestAnimationFrame(updateHighlight);

    return () => {
      cancelAnimationFrame(rafRef.current!);
    };
  }, [videoRef]);

  return (
    <div className="transcript">
      {transcriptData.map((paragraph, idx) => (
        <div key={idx} className="mb-4">
          <div className="mb-2 font-bold">{paragraph.speaker}</div>
          <div>
            {paragraph.children.map((word) => {
              const currentWordIndex = globalWordIndex;
              globalWordIndex++;

              return (
                <span
                  key={currentWordIndex}
                  data-start={word.start}
                  data-end={word.end}
                  onClick={() => seekToWord(currentWordIndex)}
                >
                  {word.children[0].text}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const DEMO_MEDIA_URL = "presidential-debate-2-yDiWaD7juZM.mp4";
import DEMO_TRANSCRIPT from "@/../example.json";
import ReactPlayer from "react-player";

type Paragraph = {
  type: string;
  speaker: string;
  children: {
    type: string;
    start: number;
    end: number;
    children: {
      text: string;
    }[];
  }[];
};

function convertJsonFormatNew(original: RevFormat): Paragraph[] {
  const speakerMap = new Map(original.speakers.map((s) => [s.id, s.name]));
  let paragraphs: Paragraph[] = [];

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

function getTranscript(): Paragraph[] {
  let transcript = convertJsonFormatNew(DEMO_TRANSCRIPT);
  return transcript;
}
