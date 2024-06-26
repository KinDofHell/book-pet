import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="uk">
        <ThemeContextProvider>
          <body>{children}</body>
        </ThemeContextProvider>
      </html>
    </ClerkProvider>
  );
}
