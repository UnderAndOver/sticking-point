import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
// import { getServerSession } from "next-auth";
// import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sticking Point",
  description: "New Era Of Debating",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {/* <SessionProvider session={session}> */}
        <div className="flex flex-col h-screen">
          <Header />
          <div className="grow mb-auto">{children}</div>
          <Footer />
        </div>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
