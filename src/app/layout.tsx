"use client";

import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/sideBar";
import MobileSideBar from "@/components/mobileSideBar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <div className="flex text-center">
          <div className="invisible md:visible">
            <SideBar />
          </div>
          <div className="visible: md:invisible">
            <MobileSideBar />
          </div>

          <main className="md:ml-64 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
