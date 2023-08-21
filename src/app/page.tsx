import Hero from "../components/home/Hero";
import { Metadata } from "next";
import Content from "@/components/home/Content";
import Features from "@/components/home/Features";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
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
