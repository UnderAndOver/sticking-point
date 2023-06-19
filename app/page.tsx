import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Sticking Point</title>
        <meta name="description" content="Debate platform with AI assistance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />

      {/* more components to be added later... */}
    </div>
  );
}
