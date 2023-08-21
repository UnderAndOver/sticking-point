import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sticking Point",
  description: "New Era Of Debating",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="grow mb-auto">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
