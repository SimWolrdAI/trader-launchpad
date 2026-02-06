import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "The Traders | Launch Famous Traders",
  description:
    "The ultimate launchpad for famous crypto traders. Launch tokens, support your favorite traders, and earn rewards.",
  icons: {
    icon: "/main.jpg",
    shortcut: "/main.jpg",
    apple: "/main.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
