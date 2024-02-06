import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Book Glossary",
  description: "Glossary for storing information about book entities.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <ThemeContextProvider>
        <body>{children}</body>
      </ThemeContextProvider>
    </html>
  );
}
