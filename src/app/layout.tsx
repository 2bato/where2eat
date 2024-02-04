import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where2Eat",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXpRKeA6lCOiYOwwnJbx7j9GUvBig8MLw&libraries=places"
      ></script>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
