import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "Healthcare Improvement",
  description:
    "A survey to allow you to be more productive and more creative in healthcare.",
};

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(manrope.className)}>
        <ConvexClientProvider>
          {children}
          <Toaster richColors closeButton position="top-center" />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
