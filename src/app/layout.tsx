import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Himanshu Verkiya",
  description:
    "Full Stack Software Engineer specializing in AI Systems, Developer Tools, and SaaS Platforms. Building production-grade software with modern architecture.",
  keywords: [
    "Himanshu Verkiya",
    "verkiya",
    "Full Stack Engineer",
    "Software Engineer",
    "AI Systems",
    "Developer Tools",
    "SaaS",
    "Next.js",
    "TypeScript",
    "Python",
  ],
  authors: [{ name: "Himanshu Verkiya", url: "https://verkiya.tech" }],
  creator: "Himanshu Verkiya",
  metadataBase: new URL("https://verkiya.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://verkiya.tech",
    siteName: "Himanshu Verkiya",
    title: "Portfolio | Himanshu Verkiya",
    description:
      "Building AI systems, developer tools, and SaaS platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Himanshu Verkiya",
    description:
      "Building AI systems, developer tools, and SaaS platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "scroll-smooth", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-dvh bg-background text-text-primary antialiased">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
