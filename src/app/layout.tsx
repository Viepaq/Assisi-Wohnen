import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fertigoPro = localFont({
  src: "../../public/fonts/FertigoProRegular.otf",
  variable: "--font-fertigo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Assisi Wohnen - Wiens urbanes Hotel",
  description: "Assisi Wohnen im zweiten Bezirk - Gastfreundschaft und Designbewusstsein",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${fertigoPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
