import Hero from "./(components)/Hero";
import { Metadata } from "next";
import Content from "./(components)/Content";
import Features from "./(components)/Features";
import FAQ from "./(components)/FAQ";
import Contact from "./(components)/Contact";
export const metadata: Metadata = {
  title: "Sticking Point",
  description: "Debate platform with AI assistance",
  keywords: "debate platform, AI assistance, AI",
  icons: {
    icon: "/logo.png",
  },
};
export default function Home() {
  return (
    <main>
      <Hero />
      <Content />
      <Features />
      <FAQ />
      <Contact />
    </main>
  );
}
