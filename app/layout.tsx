import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kicklive | Football Live Streaming - HD Sports Index",
  description:
      "Watch Football live streaming in HD on Kicklive. Your premium destination for live soccer, basketball, and combat sports with high-speed mirrors and zero latency.",
  keywords: [
    "football live streaming",
    "kicklive",
    "watch football online",
    "live soccer hd",
    "sports streaming index"
  ],
  authors: [{ name: "Kicklive" }],
  metadataBase: new URL("https://kicklive.st"), // Replace with your actual domain
  openGraph: {
    title: "Kicklive | Football Live Streaming",
    description: "Premium HD Sports Indexing with zero latency.",
    url: "https://kicklive.st",
    siteName: "Kicklive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kicklive | Football Live Streaming",
    description: "The next era of sports streaming.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
      <body className="min-h-full bg-[#050505] text-white flex flex-col selection:bg-sports-red selection:text-white">
      {/* Main content wrapper */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Simple SEO-friendly Footer */}
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Kick<span className="text-sports-red">live</span> — Premium Football Live Streaming
        </p>
      </footer>

      {/* GOOGLE ANALYTICS IMPLEMENTATION */}
      <GoogleAnalytics gaId="G-MZ6SWYB1RF" />
      </body>
      </html>
  );
}