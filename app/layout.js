import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Nihar Singla | AI & Software Engineer",
  description:
    "Entry-Level AI & Software Engineer | Full-Stack Developer | Specialized in Real-Time Systems and Visual Learning Platforms",
  keywords: [
    "Nihar Singla",
    "AI Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "Computer Vision",
    "Machine Learning",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Nihar Singla" }],
  creator: "Nihar Singla",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
    { media: "(prefers-color-scheme: light)", color: "#030014" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="relative flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
