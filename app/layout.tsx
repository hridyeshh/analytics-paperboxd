import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaperBoxd Analytics",
  description: "Internal analytics dashboard",
  robots: "noindex,nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
