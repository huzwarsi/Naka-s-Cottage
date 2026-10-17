import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { hotelConfig } from "@/config/hotel.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${hotelConfig.name} — ${hotelConfig.location.region}, ${hotelConfig.location.country}`,
  description: hotelConfig.hero.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F6F2EA] text-[#252A24] font-sans selection:bg-[#31483A] selection:text-[#FFFCF7]"
      >
        {children}
      </body>
    </html>
  );
}
