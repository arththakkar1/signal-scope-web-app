import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import LenisProvider from "./lenis";
import { Toaster } from "@/components/ui/sonner";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "SignalScope | Image authenticity assessment",
  description: "A responsible likelihood assessment for real and AI-generated images.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(GeistSans.variable, GeistMono.variable, "font-sans", geist.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        <LenisProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
        </LenisProvider>
      </body>
    </html>
  );
}
