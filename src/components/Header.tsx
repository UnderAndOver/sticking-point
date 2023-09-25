"use client";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu } from "lucide-react"; // Import the Menu icon from lucide-react

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="group relative">
        <div className="rounded-full w-8 h-8 bg-gray-500 hover:bg-gray-400">
          {/* Your Profile Picture Here */}
          {session?.user?.image && (
            <Image
              className="rounded-full w-8 h-8"
              src={session.user.image}
              width={32}
              height={32}
              alt="avatar"
            />
          )}
        </div>
        <div className="absolute right-0 top-12 w-48 bg-white text-black p-4 rounded-lg shadow-lg hidden group-hover:block">
          <div className="flex justify-center items-center">
            <div className="rounded-full w-16 h-16 bg-gray-300">
              {/* Avatar Image Here */}
              {session?.user?.image && (
                <Image
                  className="rounded-full w-16 h-16"
                  src={session.user.image}
                  width={64}
                  height={64}
                  alt="avatar"
                />
              )}
            </div>
          </div>
          <div className="text-center mt-2 mb-4">
            <p>{session?.user?.name}</p>
          </div>
          <hr />
          <div className="mt-4">
            <p className="mb-2">Settings</p>
            <hr />
            <button className="mt-2 text-left w-full" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

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
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center h-20">
        {/* For SMALL layout */}
        <div className="flex justify-between w-full items-center h-full md:hidden">
          <button className="items-center h-full">
            <Menu color="white" size={24} />
          </button>
          <a
            className="flex title-font font-medium items-center text-white h-full"
            href="/"
          >
            <Image src="/logo.png" width={48} height={48} alt="logo" />
            <span className="ml-3 text-xl">Sticking Point</span>
          </a>
          <div className="items-center h-full">
            <AuthButton />
          </div>
        </div>

        {/* For NORMAL and WIDE layout */}
        <div className="hidden md:flex w-full justify-between items-center h-full">
          <nav className="flex flex-1 flex-wrap items-center text-base justify-start h-full">
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

          <a
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0 flex-1 justify-center h-full"
            href="/"
          >
            <Image src="/logo.png" width={48} height={48} alt="logo" />
            <span className="ml-3 text-xl">Sticking Point</span>
          </a>

          <div className="flex flex-1 justify-end items-center h-full">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
