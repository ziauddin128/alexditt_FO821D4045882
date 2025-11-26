import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard | Project Name",
  description: "Dashboard | Project Name",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/dashboard/logo.png" type="image/x-icon" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <QueryClientWrapper>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientWrapper>
        <Toaster />
      </body>
    </html>
  );
}
