import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-[100%] bg-radial-gradient">
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
