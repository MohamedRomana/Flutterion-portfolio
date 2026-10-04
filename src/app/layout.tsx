import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Loader } from "@/components/ui/Loader";
import { profile } from "@/data/profile";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Arabic app names only — not preloaded so it never blocks first paint.
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

const SITE_URL = profile.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohamed Romana — Flutter Developer",
    template: "%s | Mohamed Romana",
  },
  description:
    "Mohamed Romana is a Flutter developer building high-performance iOS & Android apps — real-time features, scalable BLoC architecture, and polished, Arabic-ready user experiences.",
  keywords: [
    "Flutter Developer",
    "Mobile App Developer",
    "Dart",
    "BLoC",
    "Flutter Portfolio",
    "Mohamed Romana",
    "iOS & Android Apps",
    "Arabic RTL apps",
  ],
  authors: [{ name: "Mohamed Romana" }],
  creator: "Mohamed Romana",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mohamed Romana — Flutter Developer",
    description:
      "High-performance Flutter apps for iOS & Android — real-time features, scalable architecture, and polished user experiences.",
    siteName: "Mohamed Romana",
    images: [
      {
        url: "/logo.png",
        width: 1672,
        height: 941,
        alt: "Mohamed Romana — Flutter Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Romana — Flutter Developer",
    description:
      "High-performance Flutter apps for iOS & Android — real-time features, scalable architecture, and polished user experiences.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/logo-icon.png", type: "image/png" }],
    apple: [{ url: "/logo-icon.png" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
    { media: "(prefers-color-scheme: light)", color: "#f3f2ed" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${cairo.variable} antialiased`}
      >
        <ThemeProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <div aria-hidden className="grain" />
          <a
            href="#main"
            className="sr-only rounded-full bg-lime px-4 py-2 text-on-lime focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
