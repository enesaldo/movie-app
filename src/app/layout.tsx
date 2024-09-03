import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import MobileSideBar from "@/components/MobileSideBar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "A Movie App Details",
  icons: {
    icon: "/public/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <div className="flex ">
          <div className="hidden md:block">
            <SideBar />
          </div>
          <div className="block md:hidden">
            <MobileSideBar />
          </div>

          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
