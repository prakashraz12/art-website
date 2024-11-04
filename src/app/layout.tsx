import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/footer";

const Fonts = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Prakash Raz Arts",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Fonts.className} antialiased`}>
        <Toaster />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
