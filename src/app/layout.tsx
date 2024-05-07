import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Diary",
  description: "Conquer your financial goals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-16`}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <>
              <Navbar />
              <main>{children}</main>
            </>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
