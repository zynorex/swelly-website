import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/providers/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Swelly — Free High-Quality Discord Music Bot",
    template: "%s • Swelly",
  },
  description:
    "Swelly is a free, high-quality Discord music bot with Spotify, Apple Music, SoundCloud support, filters, and more.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
  className={`${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
