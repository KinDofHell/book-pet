import { ReactNode } from "react";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-dark-gradient">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
