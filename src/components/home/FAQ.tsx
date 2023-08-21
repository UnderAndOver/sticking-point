"use client";
import { SetStateAction, useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void; // You may want to replace this with the actual function type if it is not a void function
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  const handleToggle = () => {
    onClick();
  };

  return (
    <div className="border-b">
      <div
        className="flex cursor-pointer justify-between gap-2 py-4 text-black hover:text-yellow-500 active:text-yellow-600"
        onClick={handleToggle}
      >
        <span className="font-semibold transition duration-100 md:text-lg">
          {question}
        </span>

        <span
          className={isOpen ? "rotate-180 text-yellow-500" : "text-yellow-500"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="mb-4 text-gray-500">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const handleItemClick = (index: SetStateAction<number>) => {
    if (openIndex === index) {
      setOpenIndex(-1); // Close the currently open item.
    } else {
      setOpenIndex(index); // Open the clicked item.
    }
  };
  const faqItems = [
    {
      question: "What is Sticking Point?",
      answer:
        "Sticking Point is an AI-powered platform that allows users to upload, participate in, and analyze debates. Our system transcribes and analyzes each debate, identifying key points, conflicts, and evidence. We also offer a community-driven fact-checking feature to ensure accurate and unbiased discussions.",
    },
    {
      question: "How does Sticking Point work?",
      answer:
        "After a user uploads a debate, Sticking Point uses AI technology to transcribe the video, identify who is speaking when (speaker diarization), and extract key points. The platform also identifies conflicts and checks for evidence supporting the arguments made. Users can then search for specific topics, review the arguments from different sides, and even participate in live debates.",
    },
    {
      question: "How does the keypoint analysis work?",
      answer:
        "Keypoint analysis involves using advanced natural language processing (NLP) to identify the primary points made by each speaker in a debate. It allows users to quickly understand the main arguments from all sides.",
    },
    {
      question: "How does Sticking Point perform fact-checking?",
      answer:
        "Sticking Point initiates the fact-checking process using AI, which identifies factual claims in the debate for verification. The platform also allows users to contribute to fact-checking efforts to ensure the accuracy and integrity of the information presented.",
    },
    {
      question: "Does Sticking Point integrate with other platforms?",
      answer:
        "Currently, Sticking Point is a standalone platform. However, we're constantly working to improve and might consider integrations in the future.",
    },
    {
      question: "How can I reach Sticking Point for support?",
      answer:
        "Reach out to us at admin@stickingpoint.co for any support needs. We're here to help!",
    },
  ];
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Frequently asked questions
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Sticking Point, your AI-enhanced platform for engaging and analyzing
            debates, is here to address commonly asked questions.
          </p>
        </div>
        <div className="mx-auto flex max-w-screen-sm flex-col border-t">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FAQ;
