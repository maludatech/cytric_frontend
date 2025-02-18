import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { APP_NAME, APP_SLOGAN, APP_DESCRIPTION } from "@/lib/constant";
import { Navbar } from "@/components/Navbar";
import App from "@/components/App";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <App>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </App>
      </body>
    </html>
  );
}
