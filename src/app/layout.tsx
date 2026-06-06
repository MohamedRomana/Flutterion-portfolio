import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Loader } from "@/components/ui/Loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const SITE_URL = "https://flutterion.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flutterion | Flutter Developer Portfolio",
    template: "%s | Flutterion",
  },
  description:
    "Flutterion is a Flutter developer portfolio showcasing high-performance mobile applications, real-time features, scalable architecture, and polished user experiences.",
  keywords: [
    "Flutter Developer",
    "Mobile App Developer",
    "Dart",
    "BLoC",
    "Flutter Portfolio",
    "Mohamed Romana",
    "Flutterion",
    "iOS & Android Apps",
  ],
  authors: [{ name: "Mohamed Romana" }],
  creator: "Mohamed Romana",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Flutterion | Flutter Developer Portfolio",
    description:
      "High-performance Flutter mobile applications — real-time features, scalable architecture, and polished user experiences.",
    siteName: "Flutterion",
    images: [
      {
        url: "/logo.png",
        width: 1280,
        height: 720,
        alt: "Flutterion — Performance in Motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutterion | Flutter Developer Portfolio",
    description:
      "High-performance Flutter mobile applications — real-time features, scalable architecture, and polished user experiences.",
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
    { media: "(prefers-color-scheme: dark)", color: "#050b16" },
    { media: "(prefers-color-scheme: light)", color: "#f5faff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <ThemeProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only rounded-lg bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
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
