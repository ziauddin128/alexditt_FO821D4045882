import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // avoids flash of unstyled text
});

export const metadata: Metadata = {
  title: "Dashboard | Streamly",
  description: "Dashboard | Streamly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <QueryClientWrapper>
          {/* <AuthProvider>{children}</AuthProvider> */}
          {children}
        </QueryClientWrapper>
        <Toaster />
      </body>
    </html>
  );
}
