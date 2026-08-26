import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TracEarnly — Track. Earn. Redeem.",
  description: "Spending tracker and rewards platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}