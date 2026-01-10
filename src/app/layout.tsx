import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inquiry Kanban Board",
  description: "A kanban board for managing inquiries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
