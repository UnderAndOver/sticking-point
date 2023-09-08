"use client";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { UserButton } from "@clerk/nextjs";
// "text-gray-400 bg-gray-900 body-font"
const Header = () => {
  const scrollPosition = useScrollPosition();
  return (
    <header
      className={`text-gray-200 bg-gray-900 body-font sticky top-0 z-50 transition-shadow ${
        scrollPosition > 0
          ? "shadow bg-opacity-70 backdrop-blur-lg backdrop-filter"
          : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          href="/"
        >
          <Image src="/logo.png" width={48} height={48} alt="logo" />

          <span className="ml-3 text-xl">Sticking Point</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white" href="/debates">
            Debates
          </a>
          <a className="mr-5 hover:text-white" href="/topics">
            Topics
          </a>
          <a className="mr-5 hover:text-white" href="/about">
            About
          </a>
        </nav>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
