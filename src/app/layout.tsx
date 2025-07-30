import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";

const poppins = localFont({
  src: "./fonts/poppins-latin-500-normal.woff",
  variable: "--font-poppins-500",
  weight: "500"
});

export const metadata: Metadata = {
  title: "Daily App",
  description:
    "A simple social media app built with Next.js and Clerk for authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>
                    <div className="lg:col-span-9">{children}</div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
            <p className="w-full text-center p-2 text-xs fixed bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              &copy; All Right Reserved. AkimDev - Daily App{" "}
              {new Date().getFullYear()}
            </p>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
