import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Quick Tip - Avalanche",
  description: "Send quick tips on Avalanche"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 6000,
            style: {
              background: "rgba(30, 41, 59, 0.95)",
              color: "#fff",
              border: "1px solid rgba(71, 85, 105, 0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              padding: "16px",
              fontSize: "14px",
              maxWidth: "400px"
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff"
              },
              style: {
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)"
              }
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff"
              },
              style: {
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)"
              }
            },
            loading: {
              style: {
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)"
              }
            }
          }}
        />
      </body>
    </html>
  );
}
